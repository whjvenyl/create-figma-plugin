/** @jsx h */
import { h } from 'preact'
import { useCallback } from 'preact/hooks'
import {
  DOWN_KEY_CODE,
  ESCAPE_KEY_CODE,
  LEFT_KEY_CODE,
  RIGHT_KEY_CODE,
  UP_KEY_CODE
} from '../../utilities/key-codes'
import styles from './segmented-control.scss'

export interface SegmentedControlProps {
  disabled?: boolean,
  focused?: boolean,
  name: string,
  onChange: (state) => void, // FIXME
  options: SegmentedControlOption[],
  propagateEscapeKeyDown?: boolean,
  value: string
}
interface SegmentedControlOption {
  disabled?: boolean,
  text?: React.ReactNode,
  value: string
}

export function SegmentedControl ({
  disabled: isDisabled,
  focused: isFocused,
  name,
  onChange,
  options,
  propagateEscapeKeyDown = true,
  value,
  ...rest
} : SegmentedControlProps) {
  const handleChange = useCallback(
    function (event) {
      const index = parseInt(event.target.getAttribute('data-index'))
      onChange({ [name]: options[index].value })
    },
    [name, onChange, options]
  )

  const handleKeyDown = useCallback(
    function (event) {
      const keyCode = event.keyCode
      if (keyCode === ESCAPE_KEY_CODE) {
        if (propagateEscapeKeyDown === false) {
          event.stopPropagation()
        }
        event.target.blur()
        return
      }
      if (
        keyCode === DOWN_KEY_CODE ||
        keyCode === LEFT_KEY_CODE ||
        keyCode === RIGHT_KEY_CODE ||
        keyCode === UP_KEY_CODE
      ) {
        if (value === null) {
          onChange({ [name]: options[0].value })
          return
        }
        const currentIndex = options.findIndex(function (option) {
          return option.value === value
        })
        const nextIndex = resolveNextIndex(
          options,
          currentIndex,
          keyCode === LEFT_KEY_CODE || keyCode === UP_KEY_CODE ? -1 : 1
        )
        if (nextIndex !== -1) {
          onChange({ [name]: options[nextIndex].value })
        }
      }
    },
    [name, onChange, options, propagateEscapeKeyDown, value]
  )

  return (
    <div
      class={styles.segmentedControl}
      onKeyDown={isDisabled === true ? null : handleKeyDown}
      tabIndex={isDisabled === true ? null : 0}
      data-initial-focus={isFocused === true}
    >
      {options.map(function (option, index) {
        const text =
          typeof option.text === 'undefined' ? option.value : option.text
        return (
          <label class={styles.label} key={index}>
            <input
              {...rest}
              class={styles.input}
              type='radio'
              name={name}
              value={option.value}
              checked={value === option.value}
              disabled={isDisabled === true || option.disabled === true}
              onChange={handleChange}
              tabIndex={-1}
              data-index={index}
            />
            <div class={styles.text}>{text}</div>
          </label>
        )
      })}
    </div>
  )
}

function resolveNextIndex (options, currentIndex, delta) {
  let nextIndex = currentIndex
  do {
    nextIndex += delta
    if (nextIndex === -1) {
      nextIndex = options.length - 1
    }
    if (nextIndex === options.length) {
      nextIndex = 0
    }
    if (options[nextIndex].disabled !== true) {
      return nextIndex
    }
  } while (nextIndex !== currentIndex)
  return -1
}
