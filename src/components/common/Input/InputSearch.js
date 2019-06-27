import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    padding: "2px 4px",
    "& form": {
      display: "flex",
      alignItems: "center"
    }
  },
  input: {
    width: "100%"
  },
  iconButton: {
    padding: 4
  }
});

const InputSearch = ({
  placeholder,
  arialLabel,
  inputName,
  onSubmit,
  onChange
}) => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <form onSubmit={onSubmit} className={classes.input}>
        <SearchIcon className={classes.iconButton} />
        <InputBase
          className={classes.input}
          placeholder={placeholder}
          name={inputName}
          inputProps={{ "aria-label": { arialLabel } }}
          onChange={onChange}
        />
      </form>
    </Paper>
  );
};

InputSearch.defaultProps = {
  placeholder: "Search",
  arialLabel: "Search",
  inputName: "searchField",
  onSubmit: () => {},
  onChange: e => {
    e.preventDefault();
  }
};

export default InputSearch;
