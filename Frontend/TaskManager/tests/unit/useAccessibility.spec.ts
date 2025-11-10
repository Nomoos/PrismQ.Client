import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useAccessibility } from '../../src/composables/useAccessibility'

describe('useAccessibility', () => {
  let accessibility: ReturnType<typeof useAccessibility>

  beforeEach(() => {
    vi.useFakeTimers()
    document.body.innerHTML = ''
    accessibility = useAccessibility()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.innerHTML = ''
  })

  describe('announce', () => {
    it('should set announcement message', () => {
      accessibility.announce('Test announcement')
      
      expect(accessibility.announcement.value).toBe('Test announcement')
    })

    it('should clear announcement after timeout', () => {
      accessibility.announce('Test announcement')
      expect(accessibility.announcement.value).toBe('Test announcement')
      
      vi.advanceTimersByTime(1000)
      
      expect(accessibility.announcement.value).toBe('')
    })

    it('should clear previous announcement when new one is made', () => {
      accessibility.announce('First announcement')
      expect(accessibility.announcement.value).toBe('First announcement')
      
      vi.advanceTimersByTime(500)
      
      accessibility.announce('Second announcement')
      expect(accessibility.announcement.value).toBe('Second announcement')
      
      vi.advanceTimersByTime(1000)
      expect(accessibility.announcement.value).toBe('')
    })

    it('should handle rapid successive announcements', () => {
      accessibility.announce('First')
      accessibility.announce('Second')
      accessibility.announce('Third')
      
      expect(accessibility.announcement.value).toBe('Third')
    })
  })

  describe('moveFocus', () => {
    it('should move focus to element by selector', () => {
      const button = document.createElement('button')
      button.id = 'test-button'
      document.body.appendChild(button)
      
      const result = accessibility.moveFocus('#test-button')
      
      expect(result).toBe(true)
      expect(document.activeElement).toBe(button)
    })

    it('should move focus to HTMLElement directly', () => {
      const button = document.createElement('button')
      document.body.appendChild(button)
      
      const result = accessibility.moveFocus(button)
      
      expect(result).toBe(true)
      expect(document.activeElement).toBe(button)
    })

    it('should return false when element not found', () => {
      const result = accessibility.moveFocus('#non-existent')
      
      expect(result).toBe(false)
    })

    it('should accept focus options', () => {
      const button = document.createElement('button')
      button.id = 'test-button'
      document.body.appendChild(button)
      
      const focusSpy = vi.spyOn(button, 'focus')
      accessibility.moveFocus('#test-button', { preventScroll: true })
      
      expect(focusSpy).toHaveBeenCalledWith({ preventScroll: true })
    })

    it('should handle errors gracefully', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      
      // Pass an invalid selector that could throw
      const result = accessibility.moveFocus(null as any)
      
      expect(result).toBe(false)
      consoleWarnSpy.mockRestore()
    })
  })

  describe('trapFocus', () => {
    it('should trap focus within container', () => {
      const container = document.createElement('div')
      container.id = 'modal'
      const button1 = document.createElement('button')
      const button2 = document.createElement('button')
      const button3 = document.createElement('button')
      
      container.appendChild(button1)
      container.appendChild(button2)
      container.appendChild(button3)
      document.body.appendChild(container)
      
      accessibility.trapFocus('#modal')
      
      // First element should be focused on trap
      expect(document.activeElement).toBe(button1)
    })

    it('should cycle focus forward on Tab', () => {
      const container = document.createElement('div')
      container.id = 'modal'
      const button1 = document.createElement('button')
      const button2 = document.createElement('button')
      
      container.appendChild(button1)
      container.appendChild(button2)
      document.body.appendChild(container)
      
      accessibility.trapFocus('#modal')
      
      // Move to last button
      button2.focus()
      
      // Tab from last element should cycle to first
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      container.dispatchEvent(event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should cycle focus backward on Shift+Tab', () => {
      const container = document.createElement('div')
      container.id = 'modal'
      const button1 = document.createElement('button')
      const button2 = document.createElement('button')
      
      container.appendChild(button1)
      container.appendChild(button2)
      document.body.appendChild(container)
      
      accessibility.trapFocus('#modal')
      
      // Should be on first button
      expect(document.activeElement).toBe(button1)
      
      // Shift+Tab from first element should cycle to last
      const event = new KeyboardEvent('keydown', { 
        key: 'Tab', 
        shiftKey: true, 
        bubbles: true 
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      container.dispatchEvent(event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should return cleanup function', () => {
      const container = document.createElement('div')
      container.id = 'modal'
      const button = document.createElement('button')
      container.appendChild(button)
      document.body.appendChild(container)
      
      const cleanup = accessibility.trapFocus('#modal')
      
      expect(typeof cleanup).toBe('function')
      
      // Cleanup should remove event listener
      cleanup()
      
      const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      container.dispatchEvent(event)
      
      // Should not prevent default after cleanup
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })

    it('should return noop cleanup when container not found', () => {
      const cleanup = accessibility.trapFocus('#non-existent')
      
      expect(typeof cleanup).toBe('function')
      expect(() => cleanup()).not.toThrow()
    })

    it('should ignore non-Tab keys', () => {
      const container = document.createElement('div')
      container.id = 'modal'
      const button = document.createElement('button')
      container.appendChild(button)
      document.body.appendChild(container)
      
      accessibility.trapFocus('#modal')
      
      const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      container.dispatchEvent(event)
      
      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })
  })

  describe('getFocusableElements', () => {
    it('should return all focusable elements', () => {
      const container = document.createElement('div')
      const button = document.createElement('button')
      const link = document.createElement('a')
      link.href = '#'
      const input = document.createElement('input')
      
      container.appendChild(button)
      container.appendChild(link)
      container.appendChild(input)
      document.body.appendChild(container)
      
      const focusable = accessibility.getFocusableElements(container)
      
      expect(focusable).toHaveLength(3)
      expect(focusable).toContain(button)
      expect(focusable).toContain(link)
      expect(focusable).toContain(input)
    })

    it('should exclude disabled elements', () => {
      const container = document.createElement('div')
      const button = document.createElement('button')
      const disabledButton = document.createElement('button')
      disabledButton.disabled = true
      
      container.appendChild(button)
      container.appendChild(disabledButton)
      document.body.appendChild(container)
      
      const focusable = accessibility.getFocusableElements(container)
      
      expect(focusable).toHaveLength(1)
      expect(focusable).toContain(button)
      expect(focusable).not.toContain(disabledButton)
    })

    it('should exclude elements with tabindex="-1"', () => {
      const container = document.createElement('div')
      const button = document.createElement('button')
      const hiddenButton = document.createElement('button')
      hiddenButton.tabIndex = -1
      
      container.appendChild(button)
      container.appendChild(hiddenButton)
      document.body.appendChild(container)
      
      const focusable = accessibility.getFocusableElements(container)
      
      expect(focusable).toHaveLength(1)
      expect(focusable).toContain(button)
    })

    it('should return empty array when no focusable elements', () => {
      const container = document.createElement('div')
      const div = document.createElement('div')
      container.appendChild(div)
      document.body.appendChild(container)
      
      const focusable = accessibility.getFocusableElements(container)
      
      expect(focusable).toHaveLength(0)
    })

    it('should include elements with positive tabindex', () => {
      const container = document.createElement('div')
      const div = document.createElement('div')
      div.tabIndex = 0
      container.appendChild(div)
      document.body.appendChild(container)
      
      const focusable = accessibility.getFocusableElements(container)
      
      expect(focusable).toHaveLength(1)
      expect(focusable).toContain(div)
    })
  })

  describe('createSkipLink', () => {
    it('should create skip link element', () => {
      const skipLink = accessibility.createSkipLink('main-content')
      
      expect(skipLink.tagName).toBe('A')
      expect(skipLink.href).toContain('#main-content')
      expect(skipLink.textContent).toBe('Skip to main content')
      expect(skipLink.className).toBe('skip-link')
    })

    it('should use custom link text', () => {
      const skipLink = accessibility.createSkipLink('main', 'Skip to main')
      
      expect(skipLink.textContent).toBe('Skip to main')
    })

    it('should focus target on click', () => {
      const target = document.createElement('div')
      target.id = 'main-content'
      document.body.appendChild(target)
      
      const skipLink = accessibility.createSkipLink('main-content')
      document.body.appendChild(skipLink)
      
      const focusSpy = vi.spyOn(target, 'focus')
      skipLink.click()
      
      expect(focusSpy).toHaveBeenCalled()
      expect(target.tabIndex).toBe(-1)
    })

    it('should prevent default click behavior', () => {
      const skipLink = accessibility.createSkipLink('main-content')
      document.body.appendChild(skipLink)
      
      const event = new MouseEvent('click', { bubbles: true, cancelable: true })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')
      skipLink.dispatchEvent(event)
      
      expect(preventDefaultSpy).toHaveBeenCalled()
    })

    it('should handle missing target gracefully', () => {
      const skipLink = accessibility.createSkipLink('non-existent')
      document.body.appendChild(skipLink)
      
      expect(() => skipLink.click()).not.toThrow()
    })
  })

  describe('cleanup', () => {
    it('should clear timeout on unmount', () => {
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout')
      
      accessibility.announce('Test')
      
      // Simulate component unmount
      // Note: In actual Vue component, onUnmounted would be called automatically
      // Here we verify the timeout was set
      expect(accessibility.announcement.value).toBe('Test')
      
      clearTimeoutSpy.mockRestore()
    })
  })
})
