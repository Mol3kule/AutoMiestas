class PostError {
    protected types = {
        0: 'error_information',
        1: 'error_contacts',
        2: 'error_images',
    };

    protected errorsByType = {
        0: {
            0: 'error_title',
            1: 'error_description',
            2: 'error_category',
        },
        1: {
            0: ''
        },
        2: {
            0: ''
        }
    };

    public getErrorTypes() {
        return this.types;
    };

    public getErrorsByType(type: keyof typeof this.types) {
        return this.errorsByType[type];
    };
};

export default new PostError();