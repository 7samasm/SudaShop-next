import React from 'react'
import './Button.css'
var classNames = require('classnames');

function Button(props) {
  const classLists = createClassLists(props);
  return (
    <button className={classNames(classLists)}>
      {props.children}
    </button>
  )
}
function createClassLists(props) {
  const classLists = [];
  if (props.text)
    classLists.push('text');
  if (props.fab)
    classLists.push('fab');
  if (props.customClasses) for (const customClass of props.customClasses) {
    classLists.push(customClass)
  }
  return classLists;
}

export default Button

