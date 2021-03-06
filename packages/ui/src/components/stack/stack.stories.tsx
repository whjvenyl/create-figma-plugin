/** @jsx h */
import { h } from 'preact'
import { Stack } from './stack'
import { Text } from '../text/text'

export default { title: 'Stack' }

const style = {
  backgroundColor: 'rgba(0, 0, 255, 0.2)'
}

export const ExtraSmallSpace = function () {
  return (
    <Stack space='extraSmall'>
      <div style={style}>
        <Text>foo</Text>
      </div>
      <div style={style}>
        <Text>bar</Text>
      </div>
      <div style={style}>
        <Text>baz</Text>
      </div>
    </Stack>
  )
}

export const SmallSpace = function () {
  return (
    <Stack space='small'>
      <div style={style}>
        <Text>foo</Text>
      </div>
      <div style={style}>
        <Text>bar</Text>
      </div>
      <div style={style}>
        <Text>baz</Text>
      </div>
    </Stack>
  )
}

export const MediumSpace = function () {
  return (
    <Stack space='medium'>
      <div style={style}>
        <Text>foo</Text>
      </div>
      <div style={style}>
        <Text>bar</Text>
      </div>
      <div style={style}>
        <Text>baz</Text>
      </div>
    </Stack>
  )
}

export const LargeSpace = function () {
  return (
    <Stack space='large'>
      <div style={style}>
        <Text>foo</Text>
      </div>
      <div style={style}>
        <Text>bar</Text>
      </div>
      <div style={style}>
        <Text>baz</Text>
      </div>
    </Stack>
  )
}

export const ExtraLargeSpace = function () {
  return (
    <Stack space='extraLarge'>
      <div style={style}>
        <Text>foo</Text>
      </div>
      <div style={style}>
        <Text>bar</Text>
      </div>
      <div style={style}>
        <Text>baz</Text>
      </div>
    </Stack>
  )
}
