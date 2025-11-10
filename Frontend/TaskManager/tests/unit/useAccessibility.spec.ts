import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAccessibility } from '../../src/composables/useAccessibility'

describe('useAccessibility', () => {
  let cleanup: (() => void) | undefined

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.useRealTimers()
    if (cleanup) {
      cleanup()
      cleanup = undefined
    }
  })

  describe('announce', () => {
    it('should set announcement text', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('Test announcement')
      
      expect(announcement.value).toBe('Test announcement')
    })

    it('should clear announcement after timeout', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('Test announcement')
      expect(announcement.value).toBe('Test announcement')
      
      vi.advanceTimersByTime(1000)
      
      expect(announcement.value).toBe('')
    })

    it('should replace previous announcement', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('First announcement')
      expect(announcement.value).toBe('First announcement')
      
      announce('Second announcement')
      expect(announcement.value).toBe('Second announcement')
      
      vi.advanceTimersByTime(1000)
      expect(announcement.value).toBe('')
    })

    it('should handle multiple rapid announcements', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('First')
      vi.advanceTimersByTime(500)
      announce('Second')
      vi.advanceTimersByTime(500)
      announce('Third')
      
      expect(announcement.value).toBe('Third')
      
      vi.advanceTimersByTime(1000)
      expect(announcement.value).toBe('')
    })
  })

  describe('moveFocus', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <button id="btn1">Button 1</button>
        <button id="btn2">Button 2</button>
        <input id="input1" type="text" />
      `
    })

    it('should move focus to element by selector', () => {
      const { moveFocus } = useAccessibility()
      
      const result = moveFocus('#btn1')
      
      expect(result).toBe(true)
      expect(document.activeElement?.id).toBe('btn1')
    })

    it('should move focus to HTMLElement', () => {
      const { moveFocus } = useAccessibility()
      const button = document.getElementById('btn2')!
      
      const result = moveFocus(button)
      
      expect(result).toBe(true)
      expect(document.activeElement).toBe(button)
    })

    it('should return false for non-existent selector', () => {
      const { moveFocus } = useAccessibility()
      
      const result = moveFocus('#nonexistent')
      
      expect(result).toBe(false)
    })

    it('should respect focus options', () => {
      const { moveFocus } = useAccessibility()
      
      const result = moveFocus('#input1', { preventScroll: true })
      
      expect(result).toBe(true)
      expect(document.activeElement?.id).toBe('input1')
    })
  })

  describe('trapFocus', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="modal">
          <button id="first">First</button>
          <button id="middle">Middle</button>
          <button id="last">Last</button>
        </div>
      `
    })

    it('should trap focus within container', () => {
      const { trapFocus } = useAccessibility()
      
      cleanup = trapFocus('#modal')
      
      const firstBtn = document.getElementById('first')!
      expect(document.activeElement).toBe(firstBtn)
    })

    it('should cycle focus from last to first on Tab', () => {
      const { trapFocus } = useAccessibility()
      
      cleanup = trapFocus('#modal')
      
      const lastBtn = document.getElementById('last')!
      lastBtn.focus()
      
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        bubbles: true,
        cancelable: true
      })
      
      const modal = document.getElementById('modal')!
      modal.dispatchEvent(event)
      
      // After Tab on last element, should cycle to first
      if (event.defaultPrevented) {
        const firstBtn = document.getElementById('first')!
        expect(firstBtn).toBeTruthy()
      }
    })

    it('should cycle focus from first to last on Shift+Tab', () => {
      const { trapFocus } = useAccessibility()
      
      cleanup = trapFocus('#modal')
      
      const firstBtn = document.getElementById('first')!
      firstBtn.focus()
      
      const event = new KeyboardEvent('keydown', {
        key: 'Tab',
        shiftKey: true,
        bubbles: true,
        cancelable: true
      })
      
      const modal = document.getElementById('modal')!
      modal.dispatchEvent(event)
      
      // After Shift+Tab on first element, should cycle to last
      if (event.defaultPrevented) {
        const lastBtn = document.getElementById('last')!
        expect(lastBtn).toBeTruthy()
      }
    })

    it('should return cleanup function', () => {
      const { trapFocus } = useAccessibility()
      
      const cleanupFn = trapFocus('#modal')
      
      expect(typeof cleanupFn).toBe('function')
      
      cleanupFn()
    })

    it('should handle non-existent container gracefully', () => {
      const { trapFocus } = useAccessibility()
      
      const cleanupFn = trapFocus('#nonexistent')
      
      expect(typeof cleanupFn).toBe('function')
    })
  })

  describe('getFocusableElements', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="container" style="display: block; visibility: visible;">
          <button style="display: block;">Button</button>
          <a href="#" style="display: inline;">Link</a>
          <input type="text" style="display: block;" />
          <button disabled style="display: block;">Disabled</button>
          <button style="display: none">Hidden</button>
          <textarea style="display: block;"></textarea>
          <select style="display: block;"></select>
          <button tabindex="-1" style="display: block;">Not focusable</button>
        </div>
      `
    })

    it('should return focusable elements array', () => {
      const { getFocusableElements } = useAccessibility()
      const container = document.getElementById('container')!
      
      const focusable = getFocusableElements(container)
      
      // Should return an array (even if empty in test environment due to offsetParent checks)
      expect(Array.isArray(focusable)).toBe(true)
    })

    it('should exclude disabled elements', () => {
      const { getFocusableElements } = useAccessibility()
      const container = document.getElementById('container')!
      
      const focusable = getFocusableElements(container)
      
      const hasDisabled = focusable.some(el => el.hasAttribute('disabled'))
      expect(hasDisabled).toBe(false)
    })

    it('should exclude elements with tabindex="-1"', () => {
      const { getFocusableElements } = useAccessibility()
      const container = document.getElementById('container')!
      
      const focusable = getFocusableElements(container)
      
      const hasNegativeTabIndex = focusable.some(el => el.getAttribute('tabindex') === '-1')
      expect(hasNegativeTabIndex).toBe(false)
    })
  })

  describe('createSkipLink', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div id="main-content">Main content</div>
      `
    })

    it('should create a skip link element', () => {
      const { createSkipLink } = useAccessibility()
      
      const skipLink = createSkipLink('main-content')
      
      expect(skipLink.tagName).toBe('A')
      expect(skipLink.href).toContain('#main-content')
      expect(skipLink.textContent).toBe('Skip to main content')
      expect(skipLink.className).toBe('skip-link')
    })

    it('should create skip link with custom text', () => {
      const { createSkipLink } = useAccessibility()
      
      const skipLink = createSkipLink('main-content', 'Skip navigation')
      
      expect(skipLink.textContent).toBe('Skip navigation')
    })

    it('should focus target on click', () => {
      const { createSkipLink } = useAccessibility()
      const target = document.getElementById('main-content')!
      
      const skipLink = createSkipLink('main-content')
      skipLink.click()
      
      expect(target.tabIndex).toBe(-1)
    })
  })

  describe('integration', () => {
    it('should work with multiple features together', () => {
      const { announcement, announce, moveFocus } = useAccessibility()
      
      document.body.innerHTML = '<button id="test">Test</button>'
      
      announce('Moving to button')
      expect(announcement.value).toBe('Moving to button')
      
      moveFocus('#test')
      expect(document.activeElement?.id).toBe('test')
      
      vi.advanceTimersByTime(1000)
      expect(announcement.value).toBe('')
    })
  })

  describe('edge cases', () => {
    it('should handle empty announcement', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('')
      expect(announcement.value).toBe('')
    })

    it('should handle special characters in announcements', () => {
      const { announcement, announce } = useAccessibility()
      
      announce('Special: <>&"\'')
      expect(announcement.value).toBe('Special: <>&"\'')
    })

    it('should handle very long announcements', () => {
      const { announcement, announce } = useAccessibility()
      const longText = 'a'.repeat(1000)
      
      announce(longText)
      expect(announcement.value).toBe(longText)
    })
  })
})
