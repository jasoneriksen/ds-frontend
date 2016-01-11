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

    updateFilter: function updateFilter(e) {
        var text = e.target.value;
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

    updateSelectedRecipes: function updateSelectedRecipes(recipe, checked) {
        var selectedRecipes = this.state.selectedRecipes;
        if (checked) selectedRecipes.push(recipe);else selectedRecipes.splice(selectedRecipes.indexOf(recipe), 1);
        store.set('selectedRecipes', selectedRecipes);
        this.setState({ selectedRecipes: selectedRecipes });
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
                onChange: this.updateFilter,
                value: this.state.filter
            }),
            React.createElement(IngredientList, {
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