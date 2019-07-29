import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles(theme =>
  createStyles({
    roomInfoPanel: {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
      marginTop: "0 !important",
      boxShadow: "none",
      "&:last-child": {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
      }
    },
    panelSummary: {
      margin: "0 !important"
    },
    panelSummaryContent: {
      margin: "0 !important",
      minHeight: 0
    },
    panelSummaryExpanded: {
      minHeight: "0 !important"
    },
    panelDetails: {
      padding: 0
    }
  })
);

const RoomExpansionPanel = ({ title, className, children }) => {
  const classes = useStyles();
  return (
    <ExpansionPanel
      className={className}
      classes={{ root: classes.roomInfoPanel }}
    >
      <ExpansionPanelSummary
        classes={{
          root: classes.panelSummary,
          content: classes.panelSummaryContent,
          expanded: classes.panelSummaryExpanded
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography className={classes.heading}>{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.panelDetails}>
        {children}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default RoomExpansionPanel;
