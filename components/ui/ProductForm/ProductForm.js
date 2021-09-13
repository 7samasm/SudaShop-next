import React, {
  useEffect,
  Fragment,
  useReducer,
  useState,
  useContext,
} from "react";
import PropTypes from "prop-types";
import { Autocomplete } from "@material-ui/lab";
import {
  FormControl,
  TextField,
  Button,
  Card,
  CardContent,
  LinearProgress,
} from "@material-ui/core";
import { useRouter } from "next/router";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import CustomDialog from "../CustomDialog/CustomDialog";
import { useHttp } from "../../../hooks/http";
import sectionsCtx from "../../../ctxStore/sections_ctx";
import authCtx from "../../../ctxStore/auth_ctx";

const initDialogState = {
  open: false,
  title: "",
  text: "",
};
const dialogReducer = (state, { type, text }) => {
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

const ProductForm = ({ editable }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [section, setSection] = useState("");
  const [imageUrl] = useState("d.jpg");

  const { sections } = useContext(sectionsCtx);
  const { token } = useContext(authCtx);
  const router = useRouter();
  const [dialogState, dialogDispatch] = useReducer(
    dialogReducer,
    initDialogState
  );
  const { data, sendRequest, loading, reqIdentifier, error } = useHttp();

  useEffect(() => {
    if (error) {
      dialogDispatch({
        type: "ERROR",
        text: error,
      });
    }
    if (data && reqIdentifier === "ADD_PRODUCT") {
      dialogDispatch({
        type: "ADD",
        text: `${data.title} added sucsessfully do you want to add anthoer ?`,
      });
    } else if (data && reqIdentifier === "EDIT_PRODUCT") {
      dialogDispatch({
        type: "EDIT",
        text: `${data.title} has been updated sucsessfully !`,
      });
    } else if (data && reqIdentifier === "FETCH_PRODUCT") {
      const { title, description, price, section } = data;
      setTitle(title);
      setDescription(description);
      setSection(section);
      setPrice(price);
    }
  }, [data, reqIdentifier, error]);

  // router.beforePopState(console.log('zzzzzzzzzzzzzzzzzzzzz'));

  useEffect(() => {
    if (editable) {
      sendRequest(
        `admin/products/${router.query.productId}`,
        "get",
        null,
        null,
        "FETCH_PRODUCT",
        token
      );
    }
    // listen to token cause re-render so was removed from array deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest, editable, router]);

  const autocompleteOptions = sections.map((val) => val.name);
  const btnText = editable ? "Edit" : "Add";
  const colorTheme = editable ? "secondary" : "primary";

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setSection(null);
    setPrice("");
  };
  const lastButtonClicked = () => {
    if (editable) {
      router.push("/admin/my-products");
      return;
    }
    clearFields();
    dialogDispatch({ type: "CLOSE" });
  };
  const firstButtonClicked = () => {
    router.push("/admin/my-products");
  };
  const sendForm = () => {
    const grapedValues = {
      title,
      description,
      section,
      price,
      imageUrl,
    };
    let url = "admin/add-product";
    let method = "post";
    let identifier = "ADD_PRODUCT";
    const formData = new FormData();
    for (const key in grapedValues) {
      if (grapedValues.hasOwnProperty(key)) {
        formData.append(key, grapedValues[key]);
      }
    }
    if (editable) {
      url = "admin/edit-product";
      method = "put";
      identifier = "EDIT_PRODUCT";
      formData.append("productId", router.query.productId);
    }
    sendRequest(url, method, formData, null, identifier, token);
  };

  const changeTitle = (e) => setTitle(e.target.value);
  const changeDescription = (e) => setDescription(e.target.value);
  const changePrice = (e) => setPrice(e.target.value);
  const changeSection = (even, value) => setSection(value);

  return (
    <Fragment>
      <LoadingSpinner open={loading} renderLoader={false} />
      <CustomDialog
        open={dialogState.open}
        title={dialogState.title}
        text={dialogState.text}
        onLastButtonClicked={lastButtonClicked}
        onFirstButtonClicked={firstButtonClicked}
        hideFirstButton={editable || error}
      />
      {loading && <LinearProgress color={colorTheme} />}
      <Card>
        <CardContent>
          <FormControl fullWidth>
            <TextField
              label="title"
              value={title}
              onChange={changeTitle}
              color={colorTheme}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="description"
              onChange={changeDescription}
              value={description}
              color={colorTheme}
            />
          </FormControl>
          <FormControl fullWidth>
            <Autocomplete
              value={section}
              options={["", ...autocompleteOptions]}
              onInputChange={changeSection}
              renderInput={(params) => (
                <TextField {...params} label="section" color={colorTheme} />
              )}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="price"
              onChange={changePrice}
              value={price}
              color={colorTheme}
              type="number"
            />
          </FormControl>
          <Button
            onClick={sendForm}
            color={colorTheme}
            variant="contained"
            style={{ display: "Block", marginTop: "15px", color: "#fff" }}
          >
            {btnText}
            {/* <CircularProgress size="20px" color="inherit" /> */}
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  );
};

ProductForm.propTypes = {
  editable: PropTypes.bool,
};

export default ProductForm;
