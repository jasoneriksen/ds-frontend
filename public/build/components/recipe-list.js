'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var RecipeList = React.createClass({
    displayName: 'RecipeList',

    updateColumnCount: function updateColumnCount() {
        var width = this.props.width || window.outerWidth;
        var columns = Math.floor(width / (this.props.minColumnWidth || 400)) + 1;
        this.setState({ columnCount: columns });
    },

    componentDidMount: function componentDidMount() {
        this.updateColumnCount();
        window.addEventListener("resize", this.updateColumnCount);
    },

    getStyle: function getStyle() {
        var columnCount = this.state && this.state.columnCount;
        return {
            wrapper: {
                display: 'block',
                marginTop: '1rem'
            },
            list: {
                WebkitColumnCount: columnCount,
                MozColumnCount: columnCount,
                columnCount: columnCount,
                WebkitColumnGap: '1rem',
                MozColumnGap: '1rem',
                columnGap: '1rem',
                margin: 0,
                padding: 0
            }
        };
    },

    renderRecipes: function renderRecipes() {
        var _this = this;

        return this.props.recipes.map(function (recipe) {
            var isSelected = _this.props.selectedRecipes.indexOf(recipe.name) !== -1;
            return React.createElement(Recipe, _extends({}, recipe, {
                isSelected: isSelected,
                onCheckChange: _this.props.updateSelected
            }));
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            { style: this.getStyle().wrapper },
            React.createElement(
                'div',
                { style: this.getStyle().list },
                this.renderRecipes()
            )
        );
    }
});