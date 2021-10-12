const updateObject = <T = {}>(oldObject: T, updatedValues: T) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export { updateObject };
