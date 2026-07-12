import { i18n } from "./pluginInstance";

export const getDefaultSettings = () => ({
    textinput: i18n('textInputValue'),
    slider: 0.5,
    checkbox: false,
    textarea: i18n('textAreaValue'),
    select: 'option1',
    // 数据迁移标志，用于版本升级迁移数据
    dataTransfer: {
        key: false
    },
});
