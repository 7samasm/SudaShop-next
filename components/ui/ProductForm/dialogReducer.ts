export const initDialogState = {
  open: false,
  title: "",
  text: "",
};
export const dialogReducer = (
  state: { open: boolean; title: string; text: string },
  { type, text }: { type: string; text: string }
) => {
  switch (type) {
    case "ADD":
      return {
        open: true,
        title: "tip :",
        text,
      };
    case "EDIT":
      return {
        open: true,
        title: "tip :",
        text,
      };
    case "ERROR":
      return {
        open: true,
        title: "error :",
        text,
      };
    case "CLOSE":
      return initDialogState;
    default:
      throw new Error("not here");
  }
};
