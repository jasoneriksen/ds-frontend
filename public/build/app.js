'use strict';

var store = {
    get: function get(prop) {
        if (localStorage[prop] === undefined) return null;
        return JSON.parse(localStorage[prop]);
    },

    set: function set(prop, value) {
        localStorage[prop] = JSON.stringify(value);
    }
};

var Main = React.createClass({
    displayName: 'Main',

    style: {
        input: {
            fontSize: '1.25rem',
            border: 'solid #888 1px',
            borderRadius: '2px',
            lineHeight: '1.5rem',
            padding: '0.5rem'
        }
    },

    getInitialState: function getInitialState() {
        return {
            recipes: store.get('recipes') || RECIPES,
            selectedRecipes: store.get('selectedRecipes') || [],
            filter: store.get('filter') || ''
        };
    },

    filterByIngredient: function filterByIngredient(text) {
        var search = new RegExp(text.toLowerCase());
        var filteredRecipes = RECIPES.filter(function (recipe) {
            var match = recipe.ingredients.filter(function (ingredient) {
                return ingredient.toLowerCase().match(search);
            });
            return match.length > 0;
        });

        store.set('recipes', filteredRecipes);

        this.setState({
            filter: text,
            recipes: filteredRecipes
        });
    },

    setFilterText: function setFilterText(text) {
        store.set('filter', text);

        if (!text.length) {
            store.set('recipes', RECIPES);
            this.setState({
                filter: '',
                recipes: RECIPES
            });
            return;
        }

        this.filterByIngredient(text);
    },

    updateFilter: function updateFilter(e) {
        this.setFilterText(e.target.value);
    },

    updateSelectedRecipes: function updateSelectedRecipes(recipe, checked) {
        var selectedRecipes = this.state.selectedRecipes;

        if (checked) selectedRecipes.push(recipe);else selectedRecipes.splice(selectedRecipes.indexOf(recipe), 1);

        store.set('selectedRecipes', selectedRecipes);
        this.setState({
            selectedRecipes: selectedRecipes
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'p',
                null,
                'Filter by Ingredient:'
            ),
            React.createElement('input', {
                type: 'text',
                style: this.style.input,
                onChange: this.updateFilter,
                value: this.state.filter
            }),
            React.createElement(IngredientList, {
                updateFilter: this.setFilterText,
                selectedRecipes: this.state.selectedRecipes
            }),
            React.createElement(RecipeList, {
                minColumnWidth: '400',
                updateSelected: this.updateSelectedRecipes,
                selectedRecipes: this.state.selectedRecipes,
                recipes: this.state.recipes
            })
        );
    }
});

ReactDOM.render(React.createElement(Main, null), document.getElementById('main'));