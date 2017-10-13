import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import {TextField, Paper, withStyles} from 'material-ui';
import { MenuItem } from 'material-ui/Menu';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

function renderInput(inputProps) {
  const { classes, value, ref, label, ...other } = inputProps;

  return (
    <TextField
      className={classes.textField}
      value={value}
      margin="normal"
      inputRef={ref}
      label={label}
      InputProps={{
        classes: {
          input: classes.input,
        },
        ...other,
      }}
    />
  );
}

function renderSuggestion(getText) {
  return (suggestion, {query, isHighlighted}) => {
    const matches = match(getText(suggestion), query);
    const parts = parse(getText(suggestion), matches);

    return (
      <MenuItem selected={isHighlighted} component="div">
        <div>
          {parts.map((part, index) => {
            return part.highlight ? (
              <span key={index} style={{fontWeight: 300}}>
              {part.text}
            </span>
            ) : (
              <strong key={index} style={{fontWeight: 500}}>
                {part.text}
              </strong>
            );
          })}
        </div>
      </MenuItem>
    );
  }
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper square{...containerProps}>
      {children}
    </Paper>
  );
}

function getSuggestions(getText, value, suggestionList) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestionList.filter(suggestion => {
      const keep =
        count < 5 && getText(suggestion).toLowerCase().slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  textField: {
    width: '100%',
  },
});

class IntegrationAutosuggest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue ? props.initialValue : '',
      suggestions: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSuggestionsClearRequested = this.handleSuggestionsClearRequested.bind(this);
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
  }

  handleSuggestionsFetchRequested(suggestionList) {
    return ({ value }) => {
      this.setState({
        suggestions: getSuggestions(this.props.valueForSuggestion, value, suggestionList),
      });
    }
  };

  handleSuggestionsClearRequested() {
    this.setState({
      suggestions: [],
    });
  };

  handleChange(event, { newValue }) {
    this.props.handleChange(newValue);
    this.setState({
      value: newValue,
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Autosuggest
        theme={{
          container: classes.container,
          suggestionsContainerOpen: classes.suggestionsContainerOpen,
          suggestionsList: classes.suggestionsList,
          suggestion: classes.suggestion,
        }}
        renderInputComponent={renderInput}
        suggestions={this.state.suggestions}
        onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested(this.props.suggestions)}
        onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={renderSuggestionsContainer}
        getSuggestionValue={this.props.handleSuggestionSelect}
        renderSuggestion={renderSuggestion(this.props.valueForSuggestion)}
        inputProps={{
          classes,
          value: this.state.value,
          label: this.props.label,
          onChange: this.handleChange,
        }}
      />
    );
  }
}

export default withStyles(styles)(IntegrationAutosuggest);