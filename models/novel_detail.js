class NovelDetail {
    constructor(title, cover, url, author, numberOfChapters, description) {
        this.novelName = title;
        this.cover= cover;
        this.url = url;
        this.author = author;
        this.numberOfChapters = numberOfChapters;
        this.description = description;
    }
}

module.exports = NovelDetail;