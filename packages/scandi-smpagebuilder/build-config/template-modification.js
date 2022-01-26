module.exports = {
    templatePlugin: {
        overrideDOM({
            dom,
            parser,
            serializer
        }) {
            const additionalHeadElements = [
                // eslint-disable-next-line max-len
                '<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">',
                `<style>
                * {font-family: 'Poppins', Helvetica, Arial, sans-serif !important;font-size: 14px;line-height: 1.5;}
                </style>`
            ];

            additionalHeadElements.forEach((elementStr) => {
                const parsedEle = parser.parseFromString(elementStr);
                dom.getElementsByTagName('head')[0].appendChild(parsedEle);
            });

            return dom;
        }
    }
};
