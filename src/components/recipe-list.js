const RecipeList = React.createClass({
    
    updateColumnCount: function() {
        const width = this.props.width || window.outerWidth;
        const columns = Math.floor(width  / (this.props.minColumnWidth || 400)) + 1;

        this.setState({
            columnCount: columns
        });
    },

    componentDidMount: function() {
        this.updateColumnCount();
        window.addEventListener("resize", this.updateColumnCount);                    
    },

    getStyle: function() {
        const columnCount = this.state && this.state.columnCount;

        return {
            wrapper: {
                display: 'block',          
                marginTop: '1rem',
            },
            list: {
                WebkitColumnCount: columnCount,
                MozColumnCount: columnCount,
                columnCount: columnCount,
                WebkitColumnGap: '1rem',
                MozColumnGap: '1rem',
                columnGap: '1rem',
                margin: 0,
                padding: 0,
            },
        }
    },

    renderRecipes: function() {
        return this.props.recipes.map((recipe) => {
            const isSelected = this.props.selectedRecipes.indexOf(recipe.name) !== -1;

            return (
                <Recipe
                    { ...recipe }
                    isSelected={ isSelected }
                    onCheckChange={ this.props.updateSelected }
                />
            );
        });
    },

    render: function() {
        return(
            <div style={ this.getStyle().wrapper }>
                <div style={ this.getStyle().list }>
                { this.renderRecipes() }
                </div>
            </div>
        );
    },
});
