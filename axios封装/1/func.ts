export default {

    extend(...arg: object[]): object {

        let name, options: any, copy;
        const length = arg.length;
        let i = 0;
        const target: any = {};

        for (; i < length; i++) {
            options = arg[i];
            if (options != null) {
                for (name in options) {
                    copy = options[name];
                    if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        return target;
    },

};
