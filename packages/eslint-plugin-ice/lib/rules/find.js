module.exports = {
    meta: {
        type: 'problem',
        schema: [
            {type: 'string'}
        ],
        messages: {
            someMessageId:'test message'
        }
    },
    create(context) {
        const options = context.options
        console.log('options: ', options);

        function findComments(comment) {
            for (let option of options) {
                if (comment.value.toLowerCase().includes(option)) {
                    context.report({
                        node: comment,
                        messageId: `请修复这个${option} 它不能被使用`
                    });
                }
            }
        }

        return {
            Program() {
                let sourceCode = context.getSourceCode()
                let comments = sourceCode.getAllComments()
                for (let comment of comments) {
                    findComments(comment)
                }
            }
        };
    }
};