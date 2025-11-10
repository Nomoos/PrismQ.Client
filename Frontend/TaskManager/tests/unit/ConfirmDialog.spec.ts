import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ConfirmDialog from '../../src/components/base/ConfirmDialog.vue'

describe('ConfirmDialog.vue', () => {
  let wrapper: any

  afterEach(() => {
    if (wrapper) {
      wrapper.unmount()
    }
  })

  describe('rendering', () => {
    it('should not render when modelValue is false', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: false
        }
      })
      
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
    })

    it('should render when modelValue is true', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })

    it('should display default title', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      expect(wrapper.text()).toContain('Confirm Action')
    })

    it('should display custom title', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          title: 'Delete Item'
        }
      })
      
      expect(wrapper.text()).toContain('Delete Item')
    })

    it('should display default message', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      expect(wrapper.text()).toContain('Are you sure you want to continue?')
    })

    it('should display custom message', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          message: 'This action cannot be undone'
        }
      })
      
      expect(wrapper.text()).toContain('This action cannot be undone')
    })

    it('should display default button texts', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      expect(wrapper.text()).toContain('Confirm')
      expect(wrapper.text()).toContain('Cancel')
    })

    it('should display custom button texts', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          confirmText: 'Delete',
          cancelText: 'Keep'
        }
      })
      
      expect(wrapper.text()).toContain('Delete')
      expect(wrapper.text()).toContain('Keep')
    })
  })

  describe('danger mode', () => {
    it('should use primary styling by default', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const confirmButton = wrapper.findAll('button')[1]
      expect(confirmButton.classes()).toContain('bg-primary-600')
    })

    it('should use danger styling when dangerMode is true', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          dangerMode: true
        }
      })
      
      const confirmButton = wrapper.findAll('button')[1]
      expect(confirmButton.classes()).toContain('bg-red-600')
    })
  })

  describe('interactions', () => {
    it('should emit confirm event when confirm button clicked', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const confirmButton = wrapper.findAll('button')[1]
      await confirmButton.trigger('click')
      
      expect(wrapper.emitted()).toHaveProperty('confirm')
      expect(wrapper.emitted().confirm).toHaveLength(1)
    })

    it('should emit update:modelValue false when confirm button clicked', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const confirmButton = wrapper.findAll('button')[1]
      await confirmButton.trigger('click')
      
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false])
    })

    it('should emit cancel event when cancel button clicked', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const cancelButton = wrapper.findAll('button')[0]
      await cancelButton.trigger('click')
      
      expect(wrapper.emitted()).toHaveProperty('cancel')
      expect(wrapper.emitted().cancel).toHaveLength(1)
    })

    it('should emit update:modelValue false when cancel button clicked', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const cancelButton = wrapper.findAll('button')[0]
      await cancelButton.trigger('click')
      
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
      expect(wrapper.emitted()['update:modelValue'][0]).toEqual([false])
    })

    it('should emit cancel when clicking backdrop', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const backdrop = wrapper.find('.fixed.inset-0')
      await backdrop.trigger('click.self')
      
      expect(wrapper.emitted()).toHaveProperty('cancel')
    })
  })

  describe('accessibility', () => {
    it('should have dialog role', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const dialog = wrapper.find('[role="dialog"]')
      expect(dialog.exists()).toBe(true)
    })

    it('should have aria-modal attribute', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const dialog = wrapper.find('[role="dialog"]')
      expect(dialog.attributes('aria-modal')).toBe('true')
    })

    it('should have aria-labelledby pointing to title', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const dialog = wrapper.find('[role="dialog"]')
      const labelledBy = dialog.attributes('aria-labelledby')
      
      expect(labelledBy).toBeTruthy()
      expect(wrapper.find(`#${labelledBy}`).exists()).toBe(true)
    })

    it('should have minimum touch target sizes for buttons', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true
        }
      })
      
      const buttons = wrapper.findAll('button')
      buttons.forEach(button => {
        expect(button.classes()).toContain('min-h-[44px]')
        expect(button.classes()).toContain('min-w-[80px]')
      })
    })
  })

  describe('v-model binding', () => {
    it('should update when v-model value changes', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: false,
          'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value })
        }
      })
      
      expect(wrapper.find('[role="dialog"]').exists()).toBe(false)
      
      await wrapper.setProps({ modelValue: true })
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle empty title', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          title: ''
        }
      })
      
      expect(wrapper.find('h2').text()).toBe('')
    })

    it('should handle empty message', () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          message: ''
        }
      })
      
      expect(wrapper.find('p').text()).toBe('')
    })

    it('should handle long messages gracefully', () => {
      const longMessage = 'This is a very long message '.repeat(20)
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          message: longMessage
        }
      })
      
      expect(wrapper.text()).toContain(longMessage)
    })

    it('should handle rapid open/close', async () => {
      wrapper = mount(ConfirmDialog, {
        props: {
          modelValue: true,
          'onUpdate:modelValue': (value: boolean) => wrapper.setProps({ modelValue: value })
        }
      })
      
      const confirmButton = wrapper.findAll('button')[1]
      await confirmButton.trigger('click')
      await wrapper.vm.$nextTick()
      
      expect(wrapper.emitted()['update:modelValue']).toBeTruthy()
    })
  })
})
