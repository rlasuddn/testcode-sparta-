class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        if (this.boards.find((boards) => boards.name === board.name)) {
            throw new Error();
        }
        board.checkboard = true;
        this.boards.push(board);
    }

    findBoardByName(boardname) {
        return this.boards.find((board) => board.name === boardname);
    }
}

class Board {
    constructor(name) {
        if (name === '' || name === null) throw new Error();
        this.name = name;
        this.checkboard = false;
        this.article = [];
    }
    publish(article) {
        if (this.checkboard === false) throw new Error();
        article.id = `${this.name}-${Math.random()}`;
        this.article.push(article);
        article.createdDate = new Date().toISOString();
    }
    getAllArticles() {
        return this.article;
    }
}

class Article {
    constructor({ subject, content, author }) {
        if (!subject || !content || !author) {
            throw new Error();
        }
        this.subject = subject;
        this.content = content;
        this.author = author;
        this.comment = [];
    }
    reply(comment) {
        if (!this.id) throw new Error();
        comment.createdDate = new Date().toISOString();
        this.comment.push(comment);
    }
    getAllComments() {
        return this.comment;
    }
}

class Comment {
    constructor({ content, author }) {
        if (!content || !author) throw new Error();
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
