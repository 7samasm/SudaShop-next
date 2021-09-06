const updateObject = (oldObject,updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues
  }
}

export {updateObject}