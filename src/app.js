let store = {
    get: function(prop) {
        if(localStorage[prop] === undefined) return null;
        return JSON.parse(localStorage[prop]);
    },

    set: function(prop, value) {
        localStorage[prop] = JSON.stringify(value);      
    }
};

const Main = React.createClass({
    style: {
        input: {
            fontSize: '1.25rem',
            border: 'solid #888 1px',
            borderRadius: '2px',
            lineHeight: '1.5rem',
            padding: '0.5rem',
        }
    },

    getInitialState: function(){
        return {
            recipes: store.get('recipes') || RECIPES,
            selectedRecipes: store.get('selectedRecipes') || [],
            filter: store.get('filter') || '',
        };               
    },

    filterByIngredient: function(text) {
        const search = new RegExp(text.toLowerCase());
        const filteredRecipes = RECIPES.filter((recipe) =>{
            const match = recipe.ingredients.filter((ingredient) =>{
                return(ingredient.toLowerCase().match(search));
            });
            return match.length > 0;
        });

        store.set('recipes', filteredRecipes);

        this.setState({
            filter: text,
            recipes: filteredRecipes
        });
    },
    
    setFilterText: function(text){
        store.set('filter', text);
        
        if(!text.length) {
            store.set('recipes', RECIPES);
            this.setState({ 
                filter: '', 
                recipes: RECIPES,
            });
            return; 
        }

        this.filterByIngredient(text);
    },

    updateFilter: function(e){
        this.setFilterText(e.target.value);
    },

    updateSelectedRecipes: function(recipe, checked) {
        const selectedRecipes = this.state.selectedRecipes;
        
        if(checked) selectedRecipes.push(recipe);
        else selectedRecipes.splice(selectedRecipes.indexOf(recipe), 1);
        
        store.set('selectedRecipes', selectedRecipes);
        this.setState({ 
            selectedRecipes: selectedRecipes 
        });
    },

    render: function(){
        return(
            <div>
                <p>Filter by Ingredient:</p>
                <input
                    type="text"
                    style={ this.style.input }
                    onChange={ this.updateFilter }
                    value={ this.state.filter }
                />
                <IngredientList
                    updateFilter={ this.setFilterText }
                    selectedRecipes={ this.state.selectedRecipes }
                />
                <RecipeList
                    minColumnWidth="400"
                    updateSelected={ this.updateSelectedRecipes }
                    selectedRecipes={ this.state.selectedRecipes }
                    recipes={ this.state.recipes }
                />
            </div>
        );
    }
});

ReactDOM.render(
    <Main/>,
    document.getElementById('main')
);

