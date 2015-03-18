(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.focusComponents = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Generator http://patorjk.com/software/taag/#p=display&h=1&f=Banner4&t=Focus-COMPONENTS
"use strict";

console.log("\n\t.########..#######...######..##.....##..######...........######...#######..##.....##.########...#######..##....##.########.##....##.########..######.\n.##.......##.....##.##....##.##.....##.##....##.........##....##.##.....##.###...###.##.....##.##.....##.###...##.##.......###...##....##....##....##\n.##.......##.....##.##.......##.....##.##...............##.......##.....##.####.####.##.....##.##.....##.####..##.##.......####..##....##....##......\n.######...##.....##.##.......##.....##..######..#######.##.......##.....##.##.###.##.########..##.....##.##.##.##.######...##.##.##....##.....######.\n.##.......##.....##.##.......##.....##.......##.........##.......##.....##.##.....##.##........##.....##.##..####.##.......##..####....##..........##\n.##.......##.....##.##....##.##.....##.##....##.........##....##.##.....##.##.....##.##........##.....##.##...###.##.......##...###....##....##....##\n.##........#######...######...#######...######...........######...#######..##.....##.##.........#######..##....##.########.##....##....##.....######.\n");
module.exports = {
	common: require("./common"),
	list: require("./list"),
	search: require("./search"),
	page: require("./page")
};

},{"./common":9,"./list":19,"./page":85,"./search":88}],2:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
/**
 * Mixin used in order to create a block.
 * @type {Object}
 */
var blockMixin = {
  /**
   * Header of theblock function.
   * @return {[type]} [description]
   */
  heading: function heading() {
    if (this.props.title) {
      return React.createElement(
        "div",
        { className: "panel-heading" },
        this.props.title
      );
    }
  },
  /**
   * Render the a block container and the cild content of the block.
   * @return {DOM}
   */
  render: function renderBlock() {
    return React.createElement(
      "div",
      { className: "panel panel-default" },
      this.heading(),
      React.createElement(
        "div",
        { className: "panel-body" },
        this.props.children
      )
    );
  }
};
module.exports = builder(blockMixin);

},{}],3:[function(require,module,exports){
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
/**/
var buttonMixin = {
	getDefaultProps: function getInputDefaultProps() {
		return {
			type: "submit",
			action: undefined,
			isPressed: false,
			style: {}
		};
	},
	handleOnClick: function handleButtonOnclick() {
		if (this.props.handleOnClick) {
			return this.props.handleOnClick.apply(this, arguments);
		}
		if (!this.props.action || !this.action[this.props.action]) {
			return console.warn("Your button action is not implemented");
		}
		return this.action[this.props.action].apply(this, arguments);
	},
	getInitialState: function getInitialState() {
		return {
			isPressed: this.props.isPressed
		};
	},
	_className: function buttonClassName() {
		return "btn btn-raised " + (this.props.style.className ? "btn-" + this.props.style.className : "");
	},
	renderPressedButton: function renderPressedButton() {
		return React.createElement(
			"button",
			null,
			"Loading..."
		);
	},
	/**
  * Render the button.
  * @return {[type]} [description]
  */
	render: function renderInput() {
		if (this.state.isPressed) {
			return this.renderPressedButton();
		}
		return React.createElement(
			"button",
			{ href: "javascript:void(0)", onClick: this.handleOnClick, type: this.props.type, className: this._className() },
			this.props.label
		);
	}
};

module.exports = builder(buttonMixin);

},{}],4:[function(require,module,exports){
"use strict";

module.exports = {
	action: require("./action")
};

},{"./action":3}],5:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Input = require("../input/text").component;
var Label = require("../label").component;
var FieldMixin = {
  /**
  * Get field default properties.
  */
  getDefaultProps: function getFieldDefaultProps() {
    return {
      hasLabel: true,
      labelSize: 3,
      type: "text",
      value: undefined,
      name: undefined
    };
  },
  getInitialState: function getInitialState() {
    return {
      error: this.props.error
    };
  },

  /**
  * Get the css class of the field component.
  */
  _className: function _className() {
    var stateClass = this.state.error ? "has-feedback has-error" : "";
    return "form-group " + stateClass;
  },
  label: function label() {
    if (this.props.hasLabel) {
      var labelClassName = "control-label col-sm-" + this.props.labelSize;
      return React.createElement(
        "label",
        {
          className: labelClassName,
          name: this.props.name,
          key: this.props.name
        },
        this.props.name
      );
    }
  },
  /**
  * Validate the field.
  * @return {object} - undefined if valid, {name: "errors"} if not valid.
  */
  validate: function validateField() {
    var validationStatus = this.refs.input.validate();
    if (validationStatus !== true) {
      this.setState({ error: validationStatus });
      return validationStatus;
    }
    return;
  },
  /**
  * Get the value from the field.
  */
  getValue: function getValue() {
    return this.refs.input.getValue();
  },
  clearError: function clearError(e) {
    this.setState({ error: undefined });
  },
  input: function input() {
    var inputClassName = "form-control col-sm-" + (12 - this.props.labelSize);
    return React.createElement(
      "div",
      { className: "input-group" },
      React.createElement(Input, {
        style: { "class": inputClassName },
        id: this.props.name,
        name: this.props.name,
        value: this.props.value,
        type: this.props.type,
        validator: this.props.validator,
        onChange: this.clearError,
        ref: "input"
      })
    );
  },
  error: function error() {
    if (this.state.error) {
      return (
        /*<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>*/
        React.createElement(
          "span",
          { className: "help-block" },
          this.state.error
        )
      );
    }
  },
  help: function help() {
    if (this.props.help) {
      return React.createElement(
        "span",
        { className: "help-block" },
        this.props.help
      );
    }
  },
  render: function renderField() {
    return React.createElement(
      "div",
      { className: this._className() },
      this.label(),
      this.input(),
      this.help(),
      this.error()
    );
  }
};
module.exports = builder(FieldMixin);

},{"../input/text":12,"../label":14}],6:[function(require,module,exports){
"use strict";

var React = window.React;
var Field = require("../field").component;
var Field = require("../field").component;
var Button = require("../button/action").component;
module.exports = { /**
                   * Create a field for the given property metadata.
                   * @param {string} name - property name.
                   */
  fieldFor: function fieldFor(name) {
    return React.createElement(Field, {
      name: name,
      ref: name,
      value: this.state[name],
      error: this.state.error ? this.state.error[name] : undefined,
      validator: this.definition[name].validator ? this.definition[name].validator : undefined
    });
  },
  /**
   * Save button/
   */
  buttonDelete: function buttonDelete() {
    return React.createElement(Button, {
      label: "delete",
      type: "button",
      css: "delete"
    });
  },
  /**
   * Save button/
   */
  buttonSave: function buttonSave() {
    return React.createElement(Button, {
      label: "save",
      type: "submit",
      css: "primary"
    });
  } };

},{"../button/action":3,"../field":5}],7:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

var builder = window.focus.component.builder;
var React = window.React;
var assign = require("object-assign");
var getEntityDefinition = window.focus.definition.entity.builder.getEntityInformations;
var formElementsMixin = require("./formElementsMixin");
var capitalize = require("lodash/string/capitalize");
var isEmpty = require("lodash/lang/isEmpty");
/**
 * Mixin to create a block for the rendering.
 * @type {Object}
 */
var formMixin = {
  mixins: [formElementsMixin],
  /**
   * Get default property for the form.
   */
  getDefaultProps: function getFormDefaultProps() {
    return {
      /**
       * Defines it the form can have  an edit mode.
       * @type {Boolean}
       */
      hasEdit: true,
      /**
       * Defines
       * @type {Boolean}
       */
      isEdit: false,
      /**
       * Style of the component.
       * @type {Object}
       */
      style: {}
    };
  },
  /**
   * Build the entity definition givent the path of the definition.
   */
  _buildDefinition: function buildFormDefinition() {
    if (!this.definitionPath) {
      throw new Error("the definition path should be defined to know the domain of your entity property.");
    }
    this.definition = getEntityDefinition(this.definitionPath, this.additionalDefinition);
  },
  /** @inheritdoc */
  getInitialState: function getFormInitialState() {
    return {
      id: this.props.id
    };
  },
  /**
   * Get the state informations from the store.
   */
  _getStateFromStores: function formGetStateFromStore() {
    if (this.getStateFromStore) {
      return this.getStateFromStore();
    }
    var newState = {};
    this.stores.map(function (storeConf) {
      storeConf.properties.map(function (property) {
        newState[property] = storeConf.store["get" + capitalize(property)]();
      });
    });
    return this._computeEntityFromStoresData(newState);
  },
  /**
   * Event handler for 'change' events coming from the stores
   */
  _onChange: function _onChange() {
    this.setState(this._getStateFromStores());
  },
  callMountedActions: function callMountedActions() {
    this._loadData();
  },
  /**
   * Register all the listeners related to the page.
   */
  _registerListeners: function _registerListeners() {
    var _this = this;

    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["add" + capitalize(property) + "ChangeListener"](_this._onChange);
        });
      });
    }
  },
  /**
  * Unregister all the listeners related to the page.
  */
  _unRegisterListeners: function _unRegisterListeners() {
    if (this.stores) {
      this.stores.map(function (storeConf) {
        storeConf.properties.map(function (property) {
          storeConf.store["remove" + capitalize(property) + "ChangeListener"]();
        });
      });
    }
  },
  /** @inheritdoc */
  componentWillMount: function formWillMount() {
    this._buildDefinition();
  },
  /** @inheritdoc */
  componentDidMount: function formDidMount() {
    //Build the definitions.
    this._registerListeners();
    if (this.registerListeners) {
      this.registerListeners();
    }
    if (this.callMountedActions) {
      this.callMountedActions();
    }
  },
  /** @inheritdoc */
  componentWillUnmount: function formWillMount() {
    this._unRegisterListeners();
    if (this.unregisterListeners) {
      this.unregisterListeners();
    }
  },
  /**
   * Get the entity identifier for the form loading.
   */
  _getId: function formGetId() {
    if (this.getEntity) {
      return this.getEntity();
    }
    return this.state.id;
  },
  /**
   * Get the constructed entity from the state.
   */
  _getEntity: function formGetEntity() {
    if (this.getEntity) {
      return this.getEntity();
    }
    return this.state;
  },
  _loadData: function formLoadData() {
    this.action.load(this._getId());
  },
  _className: function formClassName() {
    return "form-horizontal " + this.props.style.className;
  },
  /**
   * Compute the data given from the stores.
   * @param {object} data -  The data ordered by store.
   */
  _computeEntityFromStoresData: function _computeEntityFromStoresData(data) {
    if (this.computeEntityFromStoresData) {
      return this.computeEntityFromStoresData(data);
    }
    var entity = {};
    for (var key in data) {
      assign(entity, data[key]);
    }
    return entity;
  },
  /**
   * Handle the form submission.
   * @param {Event} e - React sanityze event from the form submit.
   */
  _handleSubmitForm: function handleSumbitForm(e) {
    e.preventDefault();
    if (this.validate()) {
      this.action.save(this._getEntity());
    }
    //return false;
  },
  /**
   * Validate the form information by information.
   * In case of errors the state is modified.
   * @return {undefined}
   */
  validate: function validateForm() {
    var validationMap = {};
    for (var inptKey in this.refs) {
      assign(validationMap, _defineProperty({}, inptKey, this.refs[inptKey].validate()));
    }
    if (isEmpty(validationMap)) {
      return true;
    }

    return false;
  },
  /** @inheritdoc */
  render: function renderForm() {
    return React.createElement(
      "form",
      {
        onSubmit: this._handleSubmitForm,
        className: this._className()
      },
      React.createElement(
        "fieldset",
        null,
        this.renderContent()
      )
    );
  }
};

module.exports = builder(formMixin);

},{"./formElementsMixin":6,"lodash/lang/isEmpty":67,"lodash/string/capitalize":76,"object-assign":82}],8:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var imgMixin = {
    /**
     * Display name.
     */
    displayName: "img",
    /**
     * Default props.
     * @returns {{src: name of the picture, onClick: action handler on click.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            src: undefined,
            onClick: undefined
        };
    },
    /**
     * Render the img.
     * @returns Html code.
     */
    render: function renderImg() {
        var className = "icon " + this.props.src;
        return React.createElement(
            "span",
            { className: className, onClick: this.props.onClick },
            " "
        );
    }
};

module.exports = builder(imgMixin);

},{}],9:[function(require,module,exports){
"use strict";

module.exports = {
	block: require("./block"),
	button: require("./button"),
	field: require("./field"),
	form: require("./form"),
	img: require("./img"),
	input: require("./input"),
	label: require("./label"),
	selectAction: require("./select-action")
};

},{"./block":2,"./button":4,"./field":5,"./form":7,"./img":8,"./input":11,"./label":14,"./select-action":15}],10:[function(require,module,exports){
//Target
/*
<label>
  <input type="checkbox"><span class="ripple"></span><span class="check"></span> Checkbox
</label>
 */
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

var checkBoxMixin = {
	/**
  * Get the checkbox default attributes.
  */
	getDefaultProps: function getInputDefaultProps() {
		return {
			value: undefined,
			label: undefined,
			style: {}
		};
	},
	/**
  * Properties validation.
  * @type {Object}
  */
	propTypes: {
		value: type("bool"),
		label: type("string"),
		style: type("object")
	},
	getInitialState: function getInitialState() {
		return {
			isChecked: this.props.value
		};
	},
	_onChange: function onChange(event) {
		this.setState({
			isChecked: !this.state.isChecked
		});
		if (this.props.onChange) {
			this.props.onChange(event);
		}
	},
	/**
  * Get the value from the input in  the DOM.
  */
	getValue: function getValue() {
		return this.getDOMNode().value;
	},
	/**
  * Render the Checkbox HTML.
  * @return {VirtualDOM} - The virtual DOM of the checkbox.
  */
	render: function renderCheckBox() {
		return React.createElement(
			"div",
			{ className: "checkbox" },
			React.createElement(
				"label",
				null,
				React.createElement("input", { ref: "checkbox", checked: this.state.isChecked, onChange: this._onChange, type: "checkbox" }),
				React.createElement("span", { className: "ripple" }),
				React.createElement("span", { className: "check" }),
				this.props.label ? this.props.label : ""
			)
		);
	}
};

module.exports = builder(checkBoxMixin);

},{}],11:[function(require,module,exports){
"use strict";

module.exports = {
	text: require("./text"),
	checkbox: require("./checkbox"),
	textarea: require("./textarea")
	/*,
   date: require('./date')*/
};

},{"./checkbox":10,"./text":12,"./textarea":13}],12:[function(require,module,exports){
//Dependencies.
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;

/**
 * Input text mixin.
 * @type {Object}
 */
var inputTextMixin = {
  /** @inheritdoc */
  getDefaultProps: function getInputDefaultProps() {
    return {
      type: "text",
      value: undefined,
      name: undefined,
      style: {}
    };
  },
  /** @inheritdoc */
  propTypes: {
    type: type("string"),
    value: type(["string", "number"]),
    name: type("string"),
    style: type("object")
  },
  /** @inheritdoc */
  getInitialState: function getInitialStateInputText() {
    return {
      value: this.props.value
    };
  },
  /**
   * Update the component.
   * @param {object} newProps - The new props to update.
   */
  componentWillReceiveProps: function inputWillReceiveProps(newProps) {
    this.setState({ value: newProps.value });
  },
  /**
   * Validate the input.
   * @return {object}
   */
  validate: function validateInputText() {
    var value = this.getValue();
    if (this.props.isRequired && (value === undefined || value === "")) {
      return "Le champ " + this.props.name + " est requis";
    }
    if (this.props.validator) {
      return this.props.validator(value);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getInputTextValue() {
    return this.getDOMNode().value;
  },
  /**
   * Handle the change value of the input.
   * @param {object} event - The sanitize event of input.
   */
  _handleOnChange: function inputOnChange(event) {
    //On change handler.
    function onChg() {
      if (this.props.onChange) {
        return this.props.onChange(event);
      }
    }
    //Set the state then call the change handler.
    this.setState({ value: event.target.value }, onChg);
  },
  /**
   * Render an input.
   * @return {DOM} - The dom of an input.
   */
  render: function renderInput() {
    return React.createElement("input", {
      id: this.props.name,
      name: this.props.name,
      value: this.state.value,
      type: this.props.type,
      className: this.props.style["class"],
      onChange: this._handleOnChange
    });
  }
};

module.exports = builder(inputTextMixin);

},{}],13:[function(require,module,exports){
//Target
/*
<div class="checkbox">
  <label>
    <input type="checkbox"> Checkbox
  </label>
</div>
 */
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;
/**
*
* @type {Object}
*/
var textAreaMixin = {
  /**
   * Get the checkbox default attributes.
   */
  getDefaultProps: function getInputDefaultProps() {
    return {
      minlength: 0,
      maxlength: undefined,
      wrap: "soft",
      required: false,
      label: undefined,
      style: {},
      rows: 5,
      cols: 50
    };
  },
  /**
   * Properties validation.
   * @type {Object}
   */
  propTypes: {
    minlength: type("number"),
    maxlength: type("number"),
    wrap: type("string"),
    required: type("bool"),
    value: type("string"),
    label: type("string"),
    style: type("object"),
    rows: type("number"),
    cols: type("number")
  },
  /** inheritedDoc */
  getInitialState: function getTextAreaInitialState() {
    return {
      value: this.props.value
    };
  },
  /**
   * On change handler.
   * @param {object} event - Sanitize event.
   */
  _onChange: function onChange(event) {
    this.setState({ value: event.target.value });
    if (this.props.onChange) {
      this.props.onChange(event);
    }
  },
  /**
   * Get the value from the input in the DOM.
   */
  getValue: function getTextAreaValue() {
    return this.getDOMNode().value;
  },
  /**
   * Render the Checkbox HTML.
   * @return {VirtualDOM} - The virtual DOM of the checkbox.
   */
  render: function renderTextArea() {
    return React.createElement(
      "textarea",
      {
        ref: "textarea",
        onChange: this._onChange,
        cols: this.props.cols,
        rows: this.props.rows,
        minlength: this.props.minlength,
        maxlength: this.props.maxlength,
        className: this.props.style.className
      },
      this.state.value
    );
  }
};

module.exports = builder(textAreaMixin);

},{}],14:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
/**
 * Label mixin for form.
 * @type {Object}
 */
var labelMixin = {
	getDefaultProps: function getDefaultProps() {
		return {
			name: undefined,
			key: undefined
		};
	},
	i18n: function i18n(prop) {
		return prop;
	},
	render: function render() {
		return React.createElement(
			"label",
			{ className: this.props.css,
				htmlFor: this.props.name },
			" ",
			this.i18n(this.props.value),
			" "
		);
	}
};

module.exports = builder(labelMixin);

},{}],15:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Img = require("../img").component;

var selectActionMixin = {

    /**
     * Display name.
     */
    displayName: "select-action",
    /**
     * Default props.
     * @returns {{ operationList: list of operations,
     *              style: css class of the selector.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            style: "dots-three-vertical"
        };
    },

    /**
     * Handle action on selected item.
     * @param key
     * @returns {Function}
     */
    _handleAction: function handleSelectAction(action) {
        var _this = this;

        return function (event) {
            if (_this.props.operationParam) {
                action(_this.props.operationParam);
            } else {
                action();
            }
        };
    },

    _getList: function _getList(operationList) {
        var liList = [];
        for (var key in operationList) {
            var operation = operationList[key];

            liList.push(React.createElement(
                "li",
                { key: key, onClick: this._handleAction(operation.action), className: operation.style },
                React.createElement(
                    "a",
                    { href: "javascript:void(0)" },
                    operation.label
                )
            ));
            if (operation.childOperationList) {
                liList.push(React.createElement(
                    "li",
                    null,
                    React.createElement(
                        "ul",
                        null,
                        this._getList(operation.childOperationList)
                    )
                ));
            }
        }
        return liList;
    },

    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderSelectAcion() {
        if (this.props.operationList.length == 0) {
            return React.createElement("div", null);
        }
        var liList = this._getList(this.props.operationList);
        var style = "btn btn-primary ";
        return React.createElement(
            "div",
            { className: "select-action btn-group" },
            React.createElement(
                "a",
                { href: window.location.pathname, "data-target": "#", "class": "btn btn-primary dropdown-toggle", "data-toggle": "dropdown" },
                React.createElement(Img, { src: this.props.style })
            ),
            React.createElement(
                "ul",
                { className: "dropdown-menu" },
                liList
            )
        );
    }

};

module.exports = builder(selectActionMixin);

},{"../img":8}],16:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var topicDisplayerMixin = {

    /**
     * Display name.
     */
    displayName: "topic-displayer",

    /**
     * Default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            style: undefined, // Component css style.
            topicClickAction: function topicClickAction(key) {}, // Action when click on topic
            topicList: {} // {topic1: "Label of topic one", topic2:"Label of topic 2"} List f topics
        };
    },

    /**
     * Render the component.
     * @returns Htm code.
     */
    render: function renderSelectAcion() {
        var topicList = [];
        var className = "btn btn-primary btn-raised topic";
        for (var key in this.props.topicList) {
            topicList.push(React.createElement(
                "a",
                { href: "javascript:void(0)", onClick: this.topicClickHandler(key), className: className },
                this.props.topicList[key]
            ));
        }
        var style = "topic-displayer bs-component ";
        if (this.props.style) {
            style += this.props.style;
        }
        return React.createElement(
            "p",
            { className: style },
            topicList
        );
    },

    /**
     * Action on the topic click.
     */
    topicClickHandler: function topicClickHandler(key) {
        var _this = this;

        return function (event) {
            _this.props.topicClickAction(key);
        };
    }
};

module.exports = builder(topicDisplayerMixin);

},{}],17:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var type = window.focus.component.types;
var SelectAction = require("../../common/select-action").component;
var ActionContextual = require("../action-contextual").component;
var TopicDisplayer = require("../../common/topic-displayer").component;

var actionBarMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-bar",

    /**
     * INit default props
     * @returns Defautkl props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            selectionStatus: 0, // 0=> None, 1 => All, other value =>  some
            selectionAction: function selectionAction(selectionStatus) {}, // Action on selection click

            orderableColumnList: {}, // [{key:"columnKey", label:"columnLabel"}]
            orderAction: function orderAction(key, order) {}, // Action on click on order function
            orderSelected: {},

            facetClickAction: function facetClickAction(key) {}, // Action when click on facet
            facetList: {}, // {facet1: "Label of facet one", facet2:"Label of facet 2"} List of facets

            groupableColumnList: {}, // {col1: "Label1", col2: "Label2"}
            groupAction: function groupAction(key) {}, // Action on group function
            groupSelectedKey: undefined, // Defautl grouped key.

            operationList: [] // List of contextual operations
        };
    },

    /**
     * Render the html
     * @returns {XML}
     */
    render: function renderActionBar() {
        return React.createElement(
            "div",
            { className: "action-bar" },
            React.createElement(
                "div",
                { className: "general-action" },
                this._getSelectionObject(),
                this._getOrderObject(),
                this._getGroupObject()
            ),
            React.createElement(
                "div",
                { className: "facet-container" },
                React.createElement(TopicDisplayer, { topicList: this.props.facetList, topicClickAction: this.props.facetClickAction })
            ),
            React.createElement(
                "div",
                { className: "contextual-action" },
                React.createElement(ActionContextual, { operationList: this.props.operationList })
            )
        );
    },

    /**
     * @returns Selection component.
     * @private
     */
    _getSelectionObject: function _getSelectionObject() {
        // Selection datas
        var selectionOperationList = [{ action: this._selectionFunction(1), label: "all", style: this._getSelectedStyle(this.props.selectionStatus, 1) }, { action: this._selectionFunction(0), label: "none", style: this._getSelectedStyle(this.props.selectionStatus, 0) }];
        return React.createElement(SelectAction, { style: this._getSelectionObjectStyle(), operationList: selectionOperationList });
    },

    /**
     * @returns Order component.
     * @private
     */
    _getOrderObject: function _getOrderObject() {
        // Order
        var orderDescOperationList = [];
        var orderAscOperationList = [];
        var orderSelectedParsedKey = this.props.orderSelected.key + this.props.orderSelected.order;

        for (var key in this.props.orderableColumnList) {
            orderDescOperationList.push({
                action: this._orderFunction(key, "desc"),
                label: this.props.orderableColumnList[key],
                style: this._getSelectedStyle(key + "desc", orderSelectedParsedKey)
            });
            orderAscOperationList.push({ action: this._orderFunction(key, "asc"), label: this.props.orderableColumnList[key], style: this._getSelectedStyle(key + "asc", orderSelectedParsedKey) });
        }
        var downStyle = this.props.orderSelected.order == "desc" ? "circle-down" : "chevron-down";
        var upStyle = this.props.orderSelected.order == "asc" ? "circle-up" : "chevron-up";
        return [React.createElement(SelectAction, { style: downStyle, operationList: orderDescOperationList }), React.createElement(SelectAction, { style: upStyle, operationList: orderAscOperationList })];
    },

    /**
     * @returns Grouping component.
     * @private
     */
    _getGroupObject: function _getGroupObject() {
        var groupList = [];
        for (var key in this.props.groupableColumnList) {
            groupList.push({
                action: this._groupFunction(key),
                label: this.props.groupableColumnList[key],
                style: this._getSelectedStyle(key, this.props.groupSelectedKey)
            });
        }
        var groupOperationList = [{ label: "action.group", childOperationList: groupList }, { label: "action.ungroup", action: this._groupFunction(null) }];
        var groupStyle = this.props.groupSelectedKey ? "controller-record" : "dots-three-vertical";
        return React.createElement(SelectAction, { style: groupStyle, operationList: groupOperationList });
    },

    /**
     * @param currentKey
     * @param selectedKey
     * @returns Class selected if currentKey corresponds to the selectedKey.
     * @private
     */
    _getSelectedStyle: function _getSelectedStyle(currentKey, selectedKey) {
        if (currentKey == selectedKey) {
            return " selected ";
        }
        return undefined;
    },

    /**
     * @return Style of the selection compoent icon.
     * @private
     */
    _getSelectionObjectStyle: function _getSelectionObjectStyle() {
        if (this.props.selectionStatus == 0) {
            return "checkbox-unchecked";
        } else if (this.props.selectionStatus == 1) {
            return "checkbox-checked";
        }
        return "notification";
    },

    _selectionFunction: function _selectionFunction(selectionStatus) {
        var _this = this;

        return function (event) {
            _this.props.selectionAction(selectionStatus);
        };
    },
    _orderFunction: function _orderFunction(key, order) {
        var _this = this;

        return function (event) {
            _this.props.orderAction(key, order);
        };
    },
    _groupFunction: function _groupFunction(key) {
        var _this = this;

        return function (event) {
            _this.props.groupAction(key);
        };
    }
};

module.exports = builder(actionBarMixin);

},{"../../common/select-action":15,"../../common/topic-displayer":16,"../action-contextual":18}],18:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Button = require("../../common/button/action").component;
var SelectAction = require("../../common/select-action").component;
var type = window.focus.component.types;

var actionContextualMixin = {

    /**
     * Display name.
     */
    displayName: "list-action-contextual",

    /**
     * Init default props.
     * @returns {{operationList: List of operations.}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            operationList: [],
            operationParam: undefined
        };
    },
    /**
     * Init default state.
     * @returns {{isSecondaryActionListExpanded: true if secondary actionList is expanded.}}
     */
    getInitialState: function getInitialState() {
        return {
            isSecondaryActionListExpanded: false
        };
    },

    /**
     * handle contextual action on click.
     */
    _handleAction: function handleContextualAction(key) {
        var _this = this;

        return function (event) {
            if (_this.props.operationParam) {
                _this.props.operationList[key].action(_this.props.operationParam);
            } else {
                _this.props.operationList[key].action();
            }
        };
    },

    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderContextualAction() {
        var primaryActionList = [];
        var secondaryActionList = [];
        for (var key in this.props.operationList) {
            var operation = this.props.operationList[key];
            if (operation.priority === 1) {
                primaryActionList.push(React.createElement(Button, { key: key, style: operation.style, handleOnClick: this._handleAction(key), label: operation.label }));
            } else {
                secondaryActionList.push(operation);
            }
        }
        return React.createElement(
            "div",
            { className: "list-action-contextual" },
            React.createElement(
                "span",
                null,
                " ",
                primaryActionList
            ),
            React.createElement(SelectAction, { operationList: secondaryActionList, operationParam: this.props.operationParam, isExpanded: this.state.isSecondaryActionListExpanded })
        );
    }
};

module.exports = builder(actionContextualMixin);

},{"../../common/button/action":3,"../../common/select-action":15}],19:[function(require,module,exports){
"use strict";

module.exports = {
	actionBar: require("./action-bar"),
	actionContextual: require("./action-contextual"),
	selection: require("./selection")
};

},{"./action-bar":17,"./action-contextual":18,"./selection":20}],20:[function(require,module,exports){
"use strict";

module.exports = {
    line: require("./line"),
    list: require("./list")
};

},{"./line":22,"./list":23}],21:[function(require,module,exports){
"use strict";

var topOfElement = (function (_topOfElement) {
    var _topOfElementWrapper = function topOfElement(_x) {
        return _topOfElement.apply(this, arguments);
    };

    _topOfElementWrapper.toString = function () {
        return _topOfElement.toString();
    };

    return _topOfElementWrapper;
})(function (element) {
    if (!element) {
        return 0;
    }
    return element.offsetTop + topOfElement(element.offsetParent);
});
/**
 *
 * Mixin which add infinite scroll behavior.
 */
var InfiniteScrollMixin = {
    /**
     * defaults props for the mixin.
     * @returns {{isInfiniteScroll: boolean, initialPage: number, offset: number}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            isInfiniteScroll: true,
            initialPage: 1,
            offset: 250
        };
    },

    /**
     * Before component mount
     */
    componentWillMount: function componentWillMount() {
        this.nextPage = this.props.initialPage;
        this.parentNode = this.props.parentSelector ? document.querySelector(this.props.parentSelector) : window;
    },

    /**
     * Before component unmount.
     */
    componentWillUnmount: function componentWillUnmount() {
        if (!this.props.isManualFetch) {
            this.detachScrollListener();
        }
    },

    /**
     * After component Mount.
     */
    componentDidMount: function componentDidMount() {
        if (!this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * after component update.
     */
    componentDidUpdate: function componentDidUpdate() {
        if (!this.props.isLoading && !this.props.isManualFetch) {
            this.attachScrollListener();
        }
    },

    /**
     * Handler for the scroll event.
     */
    scrollListener: function scrollListener() {
        var el = this.getDOMNode();
        var scrollTop = this.parentNode.pageYOffset !== undefined ? this.parentNode.pageYOffset : this.parentNode.scrollTop;
        if (topOfElement(el) + el.offsetHeight - scrollTop - (window.innerHeight || this.parentNode.offsetHeight) < this.props.offset) {
            this.detachScrollListener();
            this.fetchNextPage(this.nextPage++);
        }

        //calculate visible index in the list
        /*var topHeader = topOfElement(el);
        var pageHeight = topHeader+el.offsetHeight;
        var scrollHeader = (topHeader / pageHeight)*window.innerHeight;
        //console.log((scrollTop - (topHeader / pageHeight) / (el.offsetHeight - topHeader) * this.state.data.length);
        var visibleIndex = (scrollTop - topHeader) / (el.offsetHeight) * this.state.data.length;
        console.log(visibleIndex);*/
    },

    /**
     * Attach scroll listener on the component.
     */
    attachScrollListener: function attachScrollListener() {
        if (!this.props.hasMoreData) {
            return;
        }
        this.parentNode.addEventListener("scroll", this.scrollListener);
        this.parentNode.addEventListener("resize", this.scrollListener);
        this.scrollListener();
    },

    /**
     * detach scroll listener on the component
     */
    detachScrollListener: function detachScrollListener() {
        this.parentNode.removeEventListener("scroll", this.scrollListener);
        this.parentNode.removeEventListener("resize", this.scrollListener);
    }
};

module.exports = { mixin: InfiniteScrollMixin };

},{}],22:[function(require,module,exports){
/**@jsx*/
"use strict";

var React = window.React;
var builder = window.focus.component.builder;
var type = window.focus.component.types;
var ContextualActions = require("../action-contextual").component;
var CheckBox = require("../../common/input/checkbox").component;
var lineMixin = {
    displayName: "selection-line",
    /**
     * Default properties for the line.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            operationList: []
        };
    },

    /**
     * line property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("object"),
        isSelection: type("bool"),
        isSelected: type("bool"),
        onLineClick: type("func"),
        onSelection: type("func"),
        operationList: type("array")
    },

    /**
     * State initialization.
     * @returns {{isSelected: boolean, lineItem: *}}
     */
    getInitialState: function getLineInitialState() {
        return {
            isSelected: this.props.isSelected || false
        };
    },

    /**
     * Get the line value.
     * @returns {{item: *, isSelected: (*|isSelected|boolean)}}
     */
    getValue: function getLineValue() {
        return {
            item: this.props.data,
            isSelected: this.state.isSelected
        };
    },

    /**
     * Selection Click handler.
     * @param event
     */
    _handleSelectionClick: function handleSelectionClick(event) {
        if (this.props.onSelection) {
            this.props.onSelection(this.props.data);
        }
        var select = !this.state.isSelected;
        this.setState({ isSelected: select });
    },

    /**
     * Line Click handler.
     * @param event
     */
    _handleLineClick: function handleLineClick(event) {
        if (this.props.onLineClick) {
            this.props.onLineClick(this.props.data);
        }
    },

    /**
     * Render the left box for selection
     * @returns {XML}
     */
    _renderSelectionBox: function renderSelectionBox() {
        if (this.props.isSelection) {
            var selectionClass = this.state.isSelected ? "selected" : "no-selection";
            //var image = this.state.isSelected? undefined : <img src={this.state.lineItem[this.props.iconfield]}/>
            return React.createElement(
                "div",
                { className: "sl-selection " + selectionClass },
                React.createElement(CheckBox, { value: this.state.isSelected, onChange: this._handleSelectionClick })
            );
        }
        return null;
    },

    /**
     * render content for a line.
     * @returns {*}
     */
    _renderLineContent: function renderLineContent() {
        if (this.renderLineContent) {
            return this.renderLineContent(this.props.data);
        } else {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    null,
                    this.props.data.title
                ),
                React.createElement(
                    "div",
                    null,
                    this.props.data.body
                )
            );
        }
    },

    /**
     * Render actions wich can be applied on the line
     */
    _renderActions: function renderLineActions() {
        if (this.props.operationList.length > 0) {
            return React.createElement(
                "div",
                { className: "sl-actions" },
                React.createElement(ContextualActions, { operationList: this.props.operationList, operationParam: this.props.data })
            );
        }
    },

    /**
     * Render line in list.
     * @returns {*}
     */
    render: function renderLine() {
        if (this.renderLine) {
            return this.renderLine();
        } else {
            return React.createElement(
                "li",
                { className: "sl-line" },
                this._renderSelectionBox(),
                React.createElement(
                    "div",
                    { className: "sl-content", onClick: this._handleLineClick },
                    this._renderLineContent()
                ),
                this._renderActions()
            );
        }
    }
};

module.exports = { mixin: lineMixin };

},{"../../common/input/checkbox":10,"../action-contextual":18}],23:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Line = require("./line").mixin;
var Button = require("../../common/button/action").component;
var uuid = require("uuid");
var type = window.focus.component.types;
var InfiniteScrollMixin = require("./infinite-scroll").mixin;

var listMixin = {
    mixins: [InfiniteScrollMixin],
    /**
     * Display name.
     */
    displayName: "selection-list",

    /**
     * Default properties for the list.
     * @returns {{isSelection: boolean}}
     */
    getDefaultProps: function getLineDefaultProps() {
        return {
            isSelection: true,
            isAllSelected: false,
            isLoading: false,
            hasMoreData: false,
            operationList: [],
            isManualFetch: false
        };
    },

    /**
     * list property validation.
     * @type {Object}
     */
    propTypes: {
        data: type("array"),
        isSelection: type("bool"),
        isAllSelected: type("bool"),
        onSelection: type("func"),
        onLineClick: type("func"),
        isLoading: type("bool"),
        loader: type("func"),
        FetchNextPage: type("func"),
        operationList: type("array"),
        isManualFetch: type("bool")
    },

    /**
     * Return selected items in the list.
     */
    getSelectedItems: function getListSelectedItems() {
        var selected = [];
        for (var i = 1; i < this.props.data.length + 1; i++) {
            var lineName = "line" + i;
            var lineValue = this.refs[lineName].getValue();
            if (lineValue.isSelected) {
                selected.push(lineValue.item);
            }
        }
        return selected;
    },
    fetchNextPage: function fetchNextPage(page) {
        if (!this.props.hasMoreData) {
            return;
        }
        if (this.props.fetchNextPage) {
            return this.props.fetchNextPage(page);
        }
    },

    /**
     * handle manual fetch.
     * @param event
     */
    _handleShowMore: function handleShowMore(event) {
        this.nextPage++;
        this.fetchNextPage(this.nextPage);
    },

    /**
     * Render lines of the list.
     * @returns {*}
     */
    _renderLines: function renderLines() {
        var _this = this;

        var lineCount = 1;
        var LineComponent = this.props.lineComponent || React.createClass(Line);
        return this.props.data.map(function (line) {
            return React.createElement(LineComponent, {
                key: line.id || uuid.v4(),
                data: line,
                ref: "line" + lineCount++,
                isSelection: _this.props.isSelection,
                isSelected: _this.props.isAllSelected,
                onSelection: _this.props.onSelection,
                onLineClick: _this.props.onLineClick,
                operationList: _this.props.operationList
            });
        });
    },
    _renderLoading: function _renderLoading() {
        if (this.props.isLoading) {
            if (this.props.loader) {
                return this.props.loader();
            }
            return React.createElement(
                "li",
                { className: "sl-loading" },
                "Loading ..."
            );
        }
    },

    _renderManualFetch: function renderManualFetch() {
        if (this.props.isManualFetch && this.props.hasMoreData) {
            var style = { className: "primary" };
            return React.createElement(
                "li",
                { className: "sl-button" },
                React.createElement(Button, { label: "list.selection.button.showMore",
                    type: "button",
                    handleOnClick: this._handleShowMore,
                    style: style })
            );
        }
    },

    /**
     * Render the list.
     * @returns {XML}
     */
    render: function renderList() {
        return React.createElement(
            "ul",
            { className: "selection-list" },
            this._renderLines(),
            this._renderLoading(),
            this._renderManualFetch()
        );
    }
};

module.exports = builder(listMixin);

},{"../../common/button/action":3,"./infinite-scroll":21,"./line":22,"uuid":84}],24:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback');

/**
 * This method is like `_.find` except that it returns the index of the first
 * element `predicate` returns truthy for, instead of the element itself.
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {number} Returns the index of the found element, else `-1`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'active': false },
 *   { 'user': 'fred',    'active': false },
 *   { 'user': 'pebbles', 'active': true }
 * ];
 *
 * _.findIndex(users, function(chr) {
 *   return chr.user == 'barney';
 * });
 * // => 0
 *
 * // using the `_.matches` callback shorthand
 * _.findIndex(users, { 'user': 'fred', 'active': false });
 * // => 1
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.findIndex(users, 'active', false);
 * // => 0
 *
 * // using the `_.property` callback shorthand
 * _.findIndex(users, 'active');
 * // => 2
 */
function findIndex(array, predicate, thisArg) {
  var index = -1,
      length = array ? array.length : 0;

  predicate = baseCallback(predicate, thisArg, 3);
  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = findIndex;

},{"../internal/baseCallback":28}],25:[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseEach = require('../internal/baseEach'),
    baseFind = require('../internal/baseFind'),
    findIndex = require('../array/findIndex'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments; (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
function find(collection, predicate, thisArg) {
  if (isArray(collection)) {
    var index = findIndex(collection, predicate, thisArg);
    return index > -1 ? collection[index] : undefined;
  }
  predicate = baseCallback(predicate, thisArg, 3);
  return baseFind(collection, predicate, baseEach);
}

module.exports = find;

},{"../array/findIndex":24,"../internal/baseCallback":28,"../internal/baseEach":30,"../internal/baseFind":31,"../lang/isArray":66}],26:[function(require,module,exports){
(function (global){
var cachePush = require('./cachePush'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 *
 * Creates a cache object to store unique values.
 *
 * @private
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var length = values ? values.length : 0;

  this.data = { 'hash': nativeCreate(null), 'set': new Set };
  while (length--) {
    this.push(values[length]);
  }
}

// Add functions to the `Set` cache.
SetCache.prototype.push = cachePush;

module.exports = SetCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":69,"./cachePush":48}],27:[function(require,module,exports){
/**
 * A specialized version of `_.map` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

module.exports = arrayMap;

},{}],28:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":81,"./baseMatches":41,"./baseMatchesProperty":42,"./baseProperty":43,"./bindCallback":46,"./isBindable":54}],29:[function(require,module,exports){
var baseIndexOf = require('./baseIndexOf'),
    cacheIndexOf = require('./cacheIndexOf'),
    createCache = require('./createCache');

/**
 * The base implementation of `_.difference` which accepts a single array
 * of values to exclude.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Array} values The values to exclude.
 * @returns {Array} Returns the new array of filtered values.
 */
function baseDifference(array, values) {
  var length = array ? array.length : 0,
      result = [];

  if (!length) {
    return result;
  }
  var index = -1,
      indexOf = baseIndexOf,
      isCommon = true,
      cache = (isCommon && values.length >= 200) ? createCache(values) : null,
      valuesLength = values.length;

  if (cache) {
    indexOf = cacheIndexOf;
    isCommon = false;
    values = cache;
  }
  outer:
  while (++index < length) {
    var value = array[index];

    if (isCommon && value === value) {
      var valuesIndex = valuesLength;
      while (valuesIndex--) {
        if (values[valuesIndex] === value) {
          continue outer;
        }
      }
      result.push(value);
    }
    else if (indexOf(values, value, 0) < 0) {
      result.push(value);
    }
  }
  return result;
}

module.exports = baseDifference;

},{"./baseIndexOf":36,"./cacheIndexOf":47,"./createCache":49}],30:[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":35,"./isLength":57,"./toObject":64}],31:[function(require,module,exports){
/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],32:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.flatten` with added support for restricting
 * flattening and specifying the start index.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {boolean} isDeep Specify a deep flatten.
 * @param {boolean} isStrict Restrict flattening to arrays and `arguments` objects.
 * @param {number} fromIndex The index to start from.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, isDeep, isStrict, fromIndex) {
  var index = fromIndex - 1,
      length = array.length,
      resIndex = -1,
      result = [];

  while (++index < length) {
    var value = array[index];

    if (isObjectLike(value) && isLength(value.length) && (isArray(value) || isArguments(value))) {
      if (isDeep) {
        // Recursively flatten arrays (susceptible to call stack limits).
        value = baseFlatten(value, isDeep, isStrict, 0);
      }
      var valIndex = -1,
          valLength = value.length;

      result.length += valLength;
      while (++valIndex < valLength) {
        result[++resIndex] = value[valIndex];
      }
    } else if (!isStrict) {
      result[++resIndex] = value;
    }
  }
  return result;
}

module.exports = baseFlatten;

},{"../lang/isArguments":65,"../lang/isArray":66,"./isLength":57,"./isObjectLike":58}],33:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":64}],34:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":74,"./baseFor":33}],35:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":73,"./baseFor":33}],36:[function(require,module,exports){
var indexOfNaN = require('./indexOfNaN');

/**
 * The base implementation of `_.indexOf` without support for binary searches.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  if (value !== value) {
    return indexOfNaN(array, fromIndex);
  }
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

module.exports = baseIndexOf;

},{"./indexOfNaN":53}],37:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":38}],38:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":66,"../lang/isTypedArray":72,"./equalArrays":50,"./equalByTag":51,"./equalObjects":52}],39:[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],40:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":37}],41:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":73,"./baseIsMatch":40,"./isStrictComparable":59}],42:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":37,"./isStrictComparable":59}],43:[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],44:[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":81,"./metaMap":60}],45:[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],46:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":81}],47:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is in `cache` mimicking the return signature of
 * `_.indexOf` by returning `0` if the value is found, else `-1`.
 *
 * @private
 * @param {Object} cache The cache to search.
 * @param {*} value The value to search for.
 * @returns {number} Returns `0` if `value` is found, else `-1`.
 */
function cacheIndexOf(cache, value) {
  var data = cache.data,
      result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

  return result ? 0 : -1;
}

module.exports = cacheIndexOf;

},{"../lang/isObject":70}],48:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Adds `value` to the cache.
 *
 * @private
 * @name push
 * @memberOf SetCache
 * @param {*} value The value to cache.
 */
function cachePush(value) {
  var data = this.data;
  if (typeof value == 'string' || isObject(value)) {
    data.set.add(value);
  } else {
    data.hash[value] = true;
  }
}

module.exports = cachePush;

},{"../lang/isObject":70}],49:[function(require,module,exports){
(function (global){
var SetCache = require('./SetCache'),
    constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var Set = isNative(Set = global.Set) && Set;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * Creates a `Set` cache object to optimize linear searches of large arrays.
 *
 * @private
 * @param {Array} [values] The values to cache.
 * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
 */
var createCache = !(nativeCreate && Set) ? constant(null) : function(values) {
  return new SetCache(values);
};

module.exports = createCache;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":69,"../utility/constant":80,"./SetCache":26}],50:[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],51:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],52:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":73}],53:[function(require,module,exports){
/**
 * Gets the index at which the first occurrence of `NaN` is found in `array`.
 * If `fromRight` is provided elements of `array` are iterated from right to left.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched `NaN`, else `-1`.
 */
function indexOfNaN(array, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 0 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    var other = array[index];
    if (other !== other) {
      return index;
    }
  }
  return -1;
}

module.exports = indexOfNaN;

},{}],54:[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":69,"../support":79,"./baseSetData":44}],55:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],56:[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":70,"./isIndex":55,"./isLength":57}],57:[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],58:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],59:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":70}],60:[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../lang/isNative":69}],61:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * A specialized version of `_.pick` that picks `object` properties specified
 * by the `props` array.
 *
 * @private
 * @param {Object} object The source object.
 * @param {string[]} props The property names to pick.
 * @returns {Object} Returns the new object.
 */
function pickByArray(object, props) {
  object = toObject(object);

  var index = -1,
      length = props.length,
      result = {};

  while (++index < length) {
    var key = props[index];
    if (key in object) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = pickByArray;

},{"./toObject":64}],62:[function(require,module,exports){
var baseForIn = require('./baseForIn');

/**
 * A specialized version of `_.pick` that picks `object` properties `predicate`
 * returns truthy for.
 *
 * @private
 * @param {Object} object The source object.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Object} Returns the new object.
 */
function pickByCallback(object, predicate) {
  var result = {};
  baseForIn(object, function(value, key, object) {
    if (predicate(value, key, object)) {
      result[key] = value;
    }
  });
  return result;
}

module.exports = pickByCallback;

},{"./baseForIn":34}],63:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":65,"../lang/isArray":66,"../object/keysIn":74,"../support":79,"./isIndex":55,"./isLength":57}],64:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":70}],65:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":57,"../internal/isObjectLike":58}],66:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":57,"../internal/isObjectLike":58,"./isNative":69}],67:[function(require,module,exports){
var isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isFunction = require('./isFunction'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike'),
    isString = require('./isString'),
    keys = require('../object/keys');

/**
 * Checks if `value` is empty. A value is considered empty unless it is an
 * `arguments` object, array, string, or jQuery-like collection with a length
 * greater than `0` or an object with own enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {Array|Object|string} value The value to inspect.
 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
 * @example
 *
 * _.isEmpty(null);
 * // => true
 *
 * _.isEmpty(true);
 * // => true
 *
 * _.isEmpty(1);
 * // => true
 *
 * _.isEmpty([1, 2, 3]);
 * // => false
 *
 * _.isEmpty({ 'a': 1 });
 * // => false
 */
function isEmpty(value) {
  if (value == null) {
    return true;
  }
  var length = value.length;
  if (isLength(length) && (isArray(value) || isString(value) || isArguments(value) ||
      (isObjectLike(value) && isFunction(value.splice)))) {
    return !length;
  }
  return !keys(value).length;
}

module.exports = isEmpty;

},{"../internal/isLength":57,"../internal/isObjectLike":58,"../object/keys":73,"./isArguments":65,"./isArray":66,"./isFunction":68,"./isString":71}],68:[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../internal/baseIsFunction":39,"./isNative":69}],69:[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":58,"../string/escapeRegExp":77}],70:[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],71:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":58}],72:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":57,"../internal/isObjectLike":58}],73:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":57,"../internal/shimKeys":63,"../lang/isNative":69,"../lang/isObject":70}],74:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":55,"../internal/isLength":57,"../lang/isArguments":65,"../lang/isArray":66,"../lang/isObject":70,"../support":79}],75:[function(require,module,exports){
var arrayMap = require('../internal/arrayMap'),
    baseDifference = require('../internal/baseDifference'),
    baseFlatten = require('../internal/baseFlatten'),
    bindCallback = require('../internal/bindCallback'),
    keysIn = require('./keysIn'),
    pickByArray = require('../internal/pickByArray'),
    pickByCallback = require('../internal/pickByCallback');

/**
 * The opposite of `_.pick`; this method creates an object composed of the
 * own and inherited enumerable properties of `object` that are not omitted.
 * Property names may be specified as individual arguments or as arrays of
 * property names. If `predicate` is provided it is invoked for each property
 * of `object` omitting the properties `predicate` returns truthy for. The
 * predicate is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The source object.
 * @param {Function|...(string|string[])} [predicate] The function invoked per
 *  iteration or property names to omit, specified as individual property
 *  names or arrays of property names.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'user': 'fred', 'age': 40 };
 *
 * _.omit(object, 'age');
 * // => { 'user': 'fred' }
 *
 * _.omit(object, _.isNumber);
 * // => { 'user': 'fred' }
 */
function omit(object, predicate, thisArg) {
  if (object == null) {
    return {};
  }
  if (typeof predicate != 'function') {
    var props = arrayMap(baseFlatten(arguments, false, false, 1), String);
    return pickByArray(object, baseDifference(keysIn(object), props));
  }
  predicate = bindCallback(predicate, thisArg, 3);
  return pickByCallback(object, function(value, key, object) {
    return !predicate(value, key, object);
  });
}

module.exports = omit;

},{"../internal/arrayMap":27,"../internal/baseDifference":29,"../internal/baseFlatten":32,"../internal/bindCallback":46,"../internal/pickByArray":61,"../internal/pickByCallback":62,"./keysIn":74}],76:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Capitalizes the first character of `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('fred');
 * // => 'Fred'
 */
function capitalize(string) {
  string = baseToString(string);
  return string && (string.charAt(0).toUpperCase() + string.slice(1));
}

module.exports = capitalize;

},{"../internal/baseToString":45}],77:[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":45}],78:[function(require,module,exports){
var baseToString = require('../internal/baseToString'),
    isIterateeCall = require('../internal/isIterateeCall');

/** Used to match words to create compound words. */
var reWords = (function() {
  var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
      lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

  return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
}());

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  if (guard && isIterateeCall(string, pattern, guard)) {
    pattern = null;
  }
  string = baseToString(string);
  return string.match(pattern || reWords) || [];
}

module.exports = words;

},{"../internal/baseToString":45,"../internal/isIterateeCall":56}],79:[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./lang/isNative":69}],80:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],81:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],82:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],83:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],84:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":83}],85:[function(require,module,exports){
"use strict";

module.exports = {
  search: require("./search")
};

},{"./search":87}],86:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var dispatcher = window.focus.dispatcher;
var React = window.React;
var LiveFilter = require("../../../search/live-filter/index").component;
var ListActionBar = require("../../../list/action-bar/index").component;
var ListSelection = require("../../../list/selection").list.component;
var SearchStore = window.focus.store.SearchStore;

var searchFilterResultMixin = {

    /**
     * Display name.
     */
    displayName: "search-filter-result",
    searchStore: new SearchStore(),

    /**
     * Init default props.
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facetConfig: {},
            orderableColumnList: {},
            groupableColumnList: {},
            operationList: {},
            lineComponent: undefined,
            isSelection: true,
            lineOperationList: {},
            criteria: {
                scope: undefined,
                searchText: undefined
            }
        };
    },
    /**
     * Init default state.
     */
    getInitialState: function getInitialState() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},

            selectionStatus: 0,
            orderSelected: undefined,
            groupSelectedKey: undefined,

            list: [],

            isAllSelected: true
        };
    },
    /**
     * render the component.
     * @returns Html code.
     */
    render: function renderSearchResult() {
        return React.createElement(
            "div",
            { className: "search-result" },
            React.createElement(
                "div",
                { className: "liveFilterContainer" },
                React.createElement(LiveFilter, { ref: "liveFilter", facetList: this.state.facetList,
                    selectedFacetList: this.state.selectedFacetList,
                    openedFacetList: this.state.openedFacetList,
                    config: this.props.facetConfig,
                    dataSelectionHandler: this._facetSelectionClick })
            ),
            React.createElement(
                "div",
                { className: "resultContainer" },
                React.createElement(
                    "div",
                    { className: "listActionBarContainer panel" },
                    React.createElement(ListActionBar, { selectionStatus: this.state.selectionStatus,
                        selectionAction: this._selectionGroupLineClick,
                        orderableColumnList: this.props.orderableColumnList,
                        orderAction: this._orderClick,
                        orderSelected: this.state.orderSelected,
                        groupableColumnList: this.props.groupableColumnList,
                        groupAction: this._groupClick,
                        groupSelectedKey: this.state.groupSelectedKey,
                        facetList: this._getFacetListForBar(),
                        facetClickAction: this._facetBarClick,
                        operationList: this.props.operationList })
                ),
                React.createElement(
                    "div",
                    { className: "listResultContainer panel" },
                    React.createElement(ListSelection, { data: this.state.list,
                        hasMoreData: true,
                        lineComponent: this.props.lineComponent,
                        onLineClick: this.props.onLineClick,
                        isSelection: this.props.isSelection,
                        operationList: this.props.lineOperationList,
                        isAllSelected: this.state.isAllSelected })
                )
            )
        );
    },
    componentDidMount: function componentDidMount() {
        this._registerEventList();
        this._doSearch();
    },
    _registerEventList: function registerEventList() {
        this.searchStore.addSearchChangeListener(this._searchSuccessEvent);
    },

    _doSearch: function doSearch() {
        var facets = [];
        for (var selectedFacet in this.state.selectedFacetList) {
            facets.push({ key: selectedFacet, value: this.state.selectedFacetList[selectedFacet].key });
            // facets[selectedFacet] = this.state.selectedFacetList[selectedFacet].key;
        }

        this.props.action.search({
            facets: facets,
            criteria: this.props.criteria,
            groupKey: this.state.groupSelectedKey,
            order: this.state.orderSelected
        });
    },
    _searchSuccessEvent: function searchSuccessEvent() {
        console.log("Search success");
        this.setState(this._getToUpdateState());
    },
    _getToUpdateState: function getToUpdateState() {
        var data = this.searchStore.get("search");
        return {
            facetList: data.facet,
            list: data.list
        };
    },

    _getFacetListForBar: function _getFacetListForBar() {
        var facetList = {};
        for (var key in this.state.selectedFacetList) {
            var facet = this.state.selectedFacetList[key];
            facetList[key] = facet.data.label;
        }
        return facetList;
    },

    _facetBarClick: function _facetBarClick(key) {
        var selectedFacetList = this.state.selectedFacetList;
        delete selectedFacetList[key];

        // TODO : do we do it now ?
        this.setState({ selectedFacetList: selectedFacetList });
        this._doSearch();
    },
    _groupClick: function _groupClick(key) {
        console.log("Group by : " + key);
        // TODO : do we do it now ?
        this.setState({
            groupSelectedKey: key,
            orderSelected: key != undefined ? undefined : this.state.orderSelected
        });

        this._doSearch();
    },

    _orderClick: function _orderClick(key, order) {
        console.log("Order : " + key + " - " + order);
        // TODO : do we do it now ?
        this.setState({ orderSelected: { key: key, order: order } });
        this._doSearch();
    },

    /**
     * Selection action handler.
     * @param selectionStatus (0 => nonde, 1= > all, 2=> some).
     */
    _selectionGroupLineClick: function _selectionGroupLineClick(selectionStatus) {
        console.log("Selection status : " + selectionStatus);
        console.warn("TODO : implement check/uncheck on the list rows (it shoudl be working like this, but need to be checked)");
        this.setState({
            selectionStatus: selectionStatus,
            isAllSelected: selectionStatus == 1
        });
    },

    /**
     * Handler called when facet is selected.
     * @param facetComponentData Data of facet.
     */
    _facetSelectionClick: function _facetSelectionClick(facetComponentData) {
        var selectedFacetList = facetComponentData.selectedFacetList;
        var openedFacetList = facetComponentData.openedFacetList;

        console.warn("Facet selection ");
        console.log(selectedFacetList);

        // TODO : Do we do it now ?
        this.setState({
            selectedFacetList: selectedFacetList,
            openedFacetList: openedFacetList
        });

        this._doSearch();
    }
};

module.exports = builder(searchFilterResultMixin);

},{"../../../list/action-bar/index":17,"../../../list/selection":20,"../../../search/live-filter/index":89}],87:[function(require,module,exports){
"use strict";

module.exports = {
    filterResult: require("./filter-result") };

// searchResult: require('./search-result')

},{"./filter-result":86}],88:[function(require,module,exports){
"use strict";

module.exports = {
  liveFilter: require("./live-filter"),
  quickSearch: require("./quick-search")
};

},{"./live-filter":89,"./quick-search":92}],89:[function(require,module,exports){
"use strict";

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

/**@jsx*/
var builder = window.focus.component.builder;
var React = window.React;
var LiveFilterFacet = require("./live-filter-facet").component;
var type = window.focus.component.types;
var assign = require("object-assign");
var omit = require("lodash/object/omit");
var Img = require("../../common/img").component;

var liveFilterMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter",

    /**
     * Init the default properties
     * @returns {{facetList: {}, selectedFacetList: {}, openedFacetList: {}, config: {}, dataSelectionHandler: undefined}}
     */
    getDefaultProps: function getDefaultProps() {
        return {
            facetList: {},
            selectedFacetList: {},
            openedFacetList: {},
            config: {},
            dataSelectionHandler: undefined
        };
    },

    /**
     * List property validation.
     */
    propTypes: {
        facetList: type("object"),
        selectedFacetList: type("object"),
        openedFacetList: type("object"),
        config: type("object"),
        dataSelectionHandler: type("func")
    },

    /**
     * Init the state of the component.
     * @returns {
     *  {isExpanded: boolean True if the component is expanded, false if collapsed,
     *   openedFacetList: Map (key : facetKey, value : true if facet expanded)}
     *   }
     */
    getInitialState: function getInitialState() {
        var openedFacetList = this.props.openedFacetList;
        if (Object.keys(openedFacetList).length == 0) {
            for (var key in this.props.facetList) {
                openedFacetList[key] = true;
                break;
            }
        }
        return {
            isExpanded: true,
            openedFacetList: openedFacetList
        };
    },
    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilter() {
        // var className = this.state.isExpanded ? "live-filter" : "live-filter collapsed";
        var className = "panel live-filter";
        if (this.state.isExpanded) {
            className += " expanded";
        }
        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFacetTitle(),
            this.renderFilterFacetList()
        );
    },

    /**
     * Render the div title of the component.
     * @Returns Html title code.
     */
    renderLiveFacetTitle: function renderLiveFacetTitle() {
        var title = this.state.isExpanded ? "live.filter.title" : "";
        var img = this.state.isExpanded ? "chevron-thin-left" : "chevron-thin-right";
        return React.createElement(
            "div",
            { className: "panel-heading" },
            React.createElement(
                "span",
                null,
                title
            ),
            React.createElement(Img, { src: img, onClick: this.liveFilterTitleClick })
        );
    },

    /**
     * Render the list of the facets.
     * @Returns Html facets code.
     */
    renderFilterFacetList: function renderFilterFacetList() {
        if (!this.state.isExpanded) {
            return;
        }
        var facets = [];
        for (var key in this.props.facetList) {
            var selectedDataKey = this.props.selectedFacetList[key] ? this.props.selectedFacetList[key].key : undefined;
            facets.push(React.createElement(LiveFilterFacet, { facetKey: key,
                facet: this.props.facetList[key],
                selectedDataKey: selectedDataKey,
                isExpanded: this.state.openedFacetList[key],
                expandHandler: this.expandFacetHandler,
                selectHandler: this.selectHandler,
                type: this.props.config[key] }));
        }
        return React.createElement(
            "div",
            { className: "panel-body" },
            facets
        );
    },

    /**
     * Action on title click.
     * Hide / Expand the component.
     */
    liveFilterTitleClick: function liveFilterTitleClick() {
        this.setState({ isExpanded: !this.state.isExpanded });
    },

    /**
     * Action on facet selection.
     */
    selectHandler: function selectLiverFilterHandler(facetKey, dataKey, data) {
        var result = { openedFacetList: this.state.openedFacetList };
        if (dataKey == undefined) {
            result.selectedFacetList = omit(this.props.selectedFacetList, facetKey);
        } else {
            result.selectedFacetList = assign(this.props.selectedFacetList, _defineProperty({}, facetKey, { key: dataKey, data: data }));
        }
        this.props.dataSelectionHandler(result);
    },

    /**
     * Expand facet action.
     * @param facetKey Key of the facet.
     * @param isExpanded true if expand action, false if collapse action.
     */
    expandFacetHandler: function expandFacetHandler(facetKey, isExpanded) {
        var openedFacetList = this.state.openedFacetList;
        openedFacetList[facetKey] = isExpanded;
        this.setState({ openedFacetList: openedFacetList });
    }
};

module.exports = builder(liveFilterMixin);

},{"../../common/img":8,"./live-filter-facet":91,"lodash/object/omit":75,"object-assign":82}],90:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;

var liveFilterDataMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter-data",

    /**
     * Render the component.
     * @returns Html code of the component.
     */
    render: function renderFacet() {
        return React.createElement(
            "div",
            { className: "lf-data", onClick: this.selectFacetData },
            this.renderData(),
            " "
        );
    },

    /**
     * Render the data.
     * @returns Html generated code.
     */
    renderData: function renderData() {
        if (this.props.type == "text") {
            return this.props.data.label + " (" + this.props.data.count + ")";
        }
        throw new Error("Unknown property type : " + this.props.type);
    },

    /**
     * Action of selection.
     */
    selectFacetData: function selectFacetDetail() {
        return this.props.selectHandler(this.props.dataKey, this.props.data);
    }
};

module.exports = builder(liveFilterDataMixin);

},{}],91:[function(require,module,exports){
/**@jsx*/
"use strict";

var builder = window.focus.component.builder;
var React = window.React;
var Data = require("./live-filter-data").component;

var liveFilterFacetMixin = {

    /**
     * Display name.
     */
    displayName: "live-filter-facet",

    /**
     * Init the component state.
     * @returns {{isShowAll: true if all the facets must be displayed or just be limited to this.props.nbDefaultDataList }}
     */
    getInitialState: function getInitialState() {
        return {
            isShowAll: false
        };
    },

    /**
     * Init the default props.
     * @returns {{nbDefaultDataList: default number of data facets displayed.}}
     */
    getDefaultProps: function getLiveFilterFacetDefaultProperties() {
        return {
            nbDefaultDataList: 6
        };
    },

    /**
     * Render the component.
     * @returns Html component code.
     */
    render: function renderLiverFilterFacet() {
        /*
        var className = this.props.isExpanded ? "lf-facet" : "lf-facet collapsed";
        if(this.props.selectedDataKey) {
            className = "lf-facet selected";
        }*/
        var className = "panel panel-primary facet";
        if (this.props.selectedDataKey) {
            className += "-selected";
        } else {
            className += " unselected";
        }
        return React.createElement(
            "div",
            { className: className },
            this.renderLiveFilterFacetTitle(),
            this.renderLiveFilterDataList()
        );
    },

    /**
     * Render the component title.
     * @returns Html component code.
     */
    renderLiveFilterFacetTitle: function renderLiveFilterFacetTitle() {
        var title = this.props.facetKey;
        if (this.props.selectedDataKey) {
            title += " : " + this.props.facet[this.props.selectedDataKey].label;
        }
        // return <div className="title"  onClick={this.liveFilterFacetTitleClick}>{title}</div>
        var className = "panel-heading";
        // if(this.props.selectedDataKey || this.props.isExpanded)
        return React.createElement(
            "div",
            { className: className, onClick: this.liveFilterFacetTitleClick },
            title
        );
    },

    /**
     * Action on facet title click.
     */
    liveFilterFacetTitleClick: function liveFilterFacetTitleClick() {
        this.props.expandHandler(this.props.facetKey, !this.props.isExpanded);
        if (this.props.selectedDataKey) {
            this.props.selectHandler(this.props.facetKey, undefined, undefined);
        }
        this.setState({ isExpanded: !this.props.isExpanded, isShowAll: false });
    },

    /**
     * Render the list of data of the facet.
     * @returns Html component code.
     */
    renderLiveFilterDataList: function renderLiveFilterDataList() {
        if (!this.props.isExpanded || this.props.selectedDataKey) {
            return;
        }
        var facetDetailList = [];
        var i = 0;
        for (var key in this.props.facet) {
            if (!this.state.isShowAll && i >= this.props.nbDefaultDataList) {
                break;
            }
            facetDetailList.push(React.createElement(
                "li",
                null,
                React.createElement(Data, { dataKey: key, data: this.props.facet[key], selectHandler: this.selectHandler, type: this.props.type })
            ));
            i++;
        }
        return React.createElement(
            "div",
            { className: "panel-body" },
            React.createElement(
                "ul",
                null,
                facetDetailList
            ),
            " ",
            this.renderShowAllDataList()
        );
    },

    /**
     * Action on facet data selection.
     */
    selectHandler: function selectHandler(dataKey, data) {
        this.props.expandHandler(this.props.facetKey, false);
        this.props.selectHandler(this.props.facetKey, dataKey, data);
    },

    /**
     * Render all the data facets.
     * @returns Html component code.
     */
    renderShowAllDataList: function renderShowAllDataList() {
        if (!this.state.isShowAll && Object.keys(this.props.facet).length > this.props.nbDefaultDataList) {
            return React.createElement(
                "a",
                { href: "javascript:void(0)", onClick: this.showAllHandler },
                " show.alls "
            );
        }
    },

    /**
     * Action on "show all" action.
     */
    showAllHandler: function showAllHandler() {
        this.setState({ isShowAll: !this.state.isShowAll });
    } };

module.exports = builder(liveFilterFacetMixin);

},{"./live-filter-data":90}],92:[function(require,module,exports){
"use strict";

module.exports = require("./input");

},{"./input":93}],93:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var type = window.focus.component.types;
var React = window.React;
var Scope = require("./scope").component;
//var Icon = require('../common/icon').component;
var words = require("lodash/string/words");
var SearchInputMixin = {
  displayName: "SearchInput",
  getDefaultProps: function getDefaultProps() {
    return {
      placeholder: "",
      value: "defaultValue",
      scope: 2,
      scopes: [{ code: undefined, label: "None", style: "qs-scope-none" }, { code: 1, label: "Scope1", style: "qs-scope-1" }, { code: 2, label: "Scope2", style: "qs-scope-2" }, { code: 3, label: "Scope3", style: "qs-scope-3" }],
      minChar: 0,
      loading: false
    };
  },
  propTypes: {
    placeholder: type("string"),
    value: type("string"),
    scope: type(["string", "number"]),
    scopes: type("array"),
    minChar: type("number"),
    loading: type("bool")
  },
  getInitialState: function getInitialState() {
    return {
      value: this.props.value,
      scope: this.props.scope,
      loading: this.props.loading
    };
  },
  getValue: function getValue() {
    return {
      scope: this.refs.scope.getValue(),
      query: this.refs.query.getDOMNode().value
    };
  },
  handleKeyUp: function handleKeyUpInputSearch(event) {
    var val = event.target.value;
    if (val.length >= this.props.minChar) {
      console.log("keyUp", words(val));
      if (this.props.handleKeyUp) {
        this.props.handleKeyUp(event);
      }
    }
  },
  handleOnClickScope: function handleOnClickScope() {
    console.log("Search value", this.getValue());
    this.setState({ scope: this.refs.scope.getValue() }, this.focusQuery);
  },
  renderHelp: function renderHelp() {
    /*if(this.state.scope){
      return;
    }*/
    return React.createElement(
      "div",
      { className: "qs-help", ref: "help" },
      React.createElement("span", { name: "share" }),
      React.createElement(
        "span",
        null,
        "Define the scope of research"
      )
    );
  },
  focusQuery: function focusQuery() {
    this.refs.query.getDOMNode().focus();
  },
  setStateFromSubComponent: function setStateFromSubComponent() {
    return this.setState(this.getValue(), this.focusQuery);
  },
  render: function renderSearchInput() {
    return React.createElement(
      "div",
      { className: "qs-quick-search" },
      React.createElement(Scope, { ref: "scope", list: this.props.scopes, value: this.state.scope, handleOnClick: this.handleOnClickScope }),
      React.createElement("input", { ref: "query", onKeyUp: this.handleKeyUp, type: "search" }),
      this.renderHelp()
    );
  }
};

module.exports = builder(SearchInputMixin);

},{"./scope":94,"lodash/string/words":78}],94:[function(require,module,exports){
"use strict";

var builder = window.focus.component.builder;
var type = window.focus.component.types;
var React = window.React;

//var type = require('../../core/validation/types');
var find = require("lodash/collection/find");
var uuid = require("uuid");
var scopeMixin = {
	/**
  * Component tag name.
  * @type {String}
  */
	displayName: "Scope",
	/**
  * Component default properties.
  */
	getDefaultProps: function getScopeDefaultProperties() {
		return {
			list: [],
			value: undefined,
			isDeployed: false
		};
	},
	/**
  * Scope property validation.
  * @type {Object}
  */
	propTypes: {
		list: type("array"),
		isDeployed: type("bool"),
		value: type(["string", "number"])
	},
	/**
  * Get the initial state from the data.
  */
	getInitialState: function getScopeInitialState() {
		return {
			isDeployed: this.props.isDeployed,
			value: this.props.value
		};
	},
	/**
  * Get the value of the scope.
  */
	getValue: function getValue() {
		return this.state.value;
	},
	/**
  * Define the scope label.
  */
	scopeLabel: function scopeLabel() {
		return;
		if (!this.state.value) {
			return "Choose your scope";
		}
		return this.state.value;
	},
	/**
  * Internal function which handles the click on the scope line element and call the real handleOnclick if it is defined.
  * @param {object} event - Event trigger by the search.
  */
	_handleOnClick: function _handleOnClick(event) {
		var val = event.target.hasAttribute("value") ? event.target.value : undefined;
		this.setState({
			value: val,
			isDeployed: false
		}, this.props.handleOnClick);
	},
	/**
  * Handle the click on the scope element.
  */
	handleDeployClick: function handleDeployClick() {
		this.setState({
			isDeployed: !this.state.isDeployed
		});
	},
	/**
  * Get the current active scope.
  */
	getActiveScope: function getActiveScope() {
		var _this = this;

		return find(this.props.list, function (scope) {
			return scope.code === _this.state.value;
		});
	},
	/**
  * Return the css class for the scope.
  */
	scopeStyle: function scopeStyle() {
		return "" + this.getActiveScope().style;
	},
	renderScopeList: function renderScopeList() {
		var _this = this;

		if (!this.state.isDeployed) {
			return;
		}
		var scopes = this.props.list.map(function (scope) {
			var selectedValue = _this.state.value === scope.code ? "active" : "";
			return React.createElement(
				"li",
				{ key: scope.code || uuid.v4(),
					value: scope.code,
					className: "" + selectedValue + " " + scope.style,
					onClick: _this._handleOnClick },
				scope.label
			);
		});
		return React.createElement(
			"ul",
			{ className: "qs-scope-list" },
			" ",
			scopes,
			" "
		);
	},
	/**
  * Render the complete scope element.
  * @return {object} - The jsx element.
  */
	render: function renderScopeComponent() {
		var cssClass = "qs-icon qs-scope-deploy-" + (this.state.isDeployed ? "up" : "down");
		return React.createElement(
			"div",
			{ className: this.props.className + " qs-scope" },
			React.createElement(
				"div",
				{ className: cssClass,
					onClick: this.handleDeployClick },
				React.createElement(
					"div",
					{ className: this.scopeStyle() },
					" ",
					this.scopeLabel(),
					" "
				)
			),
			" ",
			this.renderScopeList(),
			" "
		);
	}
};

module.exports = builder(scopeMixin);

},{"lodash/collection/find":25,"uuid":84}]},{},[1])(1)
});