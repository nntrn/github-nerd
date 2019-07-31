import React from 'react'

function props2(props, config = {}) {
  let obj = {}
  const excludeProps = config.excludeProps || []
  Object.keys(props).forEach(e => {
    if ([excludeProps].indexOf(e) === -1) {
      if (props[e] && ['true', 'false'].indexOf(props[e]) === -1) {
        obj[e] = props[e]
      }
    }
  })
  return obj
}
export function Group(props) {
  let elements = React.Children.toArray(props.children)
  elements.forEach((e, i) => {
    elements[i] = React.cloneElement(e, { className: props.childclass, ...e.props })
  })
  return <div {...props2(props)}>{elements}</div>
}
Group.defaultProps = {
  className: 'react-groups',
  childclass: 'react-group-child',
  separator: ''
}

export function Link(props) {
  const linkValue = props.children || props.value

  let newProps = props2(props)
  if (props.default) {
    newProps.handleClick = e => e.preventDefault()
  }
  if (props.opentab) {
    newProps.target = '_blank'
    newProps.rel = 'noopener noreferrer'
  }

  return <a {...newProps}>{linkValue}</a>
}
Link.defaultProps = {
  opentab: false,
  target: '',
  rel: '',
  default: false
}
