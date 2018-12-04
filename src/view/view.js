export const view = {
    button: '',
    navigation: null,
    article: '',
    divContainer: '',
    init: () => {
        this.button = `<input type="submit">`;
        this.navigation = document.getElementById('buttons');
        this.article = `<article class="page-header_selection"></article>`;
        this.divContainer = document.getElementById('output');
        this.render();
    },
    render: () => {

    }
}