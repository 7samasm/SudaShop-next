import React from "react";
// import { makeStyles } from '@material-ui/styles'
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  DialogTitle,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";

// const useStyles = makeStyles(theme => ({
//   ' MuiDialog-paper' : {}
// })
type TCustomDialogProps = {
  open: boolean;
  hideFirstButton?: boolean;
  title: string;
  text: string;
  paperWidth?: string;
  onLastButtonClicked?: (...args: any[]) => any;
  onFirstButtonClicked?: (...args: any[]) => any;
};

const CustomDialog: React.FC<TCustomDialogProps> = ({
  open,
  hideFirstButton,
  title,
  text,
  paperWidth,
  onLastButtonClicked,
  onFirstButtonClicked,
}) => {
  return (
    <Dialog
      open={open}
      PaperProps={{
        style: {
          width: paperWidth || "30%",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {!hideFirstButton && (
          <Button
            variant="text"
            color="secondary"
            onClick={onFirstButtonClicked}
          >
            no
          </Button>
        )}
        <Button variant="text" color="primary" onClick={onLastButtonClicked}>
          ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  paperWidth: PropTypes.string,
  onFirstButtonClicked: PropTypes.func,
  onLastButtonClicked: PropTypes.func,
  hideFirstButton: PropTypes.bool,
};

export default CustomDialog;
