<script lang="ts">
    import { onMount } from 'svelte';
    import SettingPanel from '@/libs/components/setting-panel.svelte';
    import { i18n } from './pluginInstance';
    import { getDefaultSettings } from './defaultSettings';
    import { pushMsg } from './api';
    import { confirm } from 'siyuan';
    export let plugin;

    // 使用动态默认设置
    let settings = { ...getDefaultSettings() };

    interface ISettingGroup {
        name: string;
        items: ISettingItem[];
        //  Type："checkbox" | "select" | "textinput" | "textarea" | "number" | "slider" | "button" | "hint" | "custom";
    }

    let groups: ISettingGroup[] = [
        {
            name: i18n('settingsGroupGroup1') || 'Tab1',
            items: [
                {
                    key: 'hint',
                    value: '',
                    type: 'hint',
                    title: i18n('hintTitle'),
                    description: i18n('hintDescription'),
                },
                {
                    key: 'textinput',
                    value: settings.textinput,
                    type: 'textinput',
                    title: i18n('textInputTitle'),
                    description: i18n('textInputDescription'),
                },
                {
                    key: 'slider',
                    value: settings.slider,
                    type: 'slider',
                    title: i18n('sliderTitle'),
                    description: i18n('sliderDescription'),
                    slider: {
                        min: 0,
                        max: 1,
                        step: 0.1,
                    },
                },
            ],
        },
        {
            name: i18n('settingsGroupGroup2') || 'Tab2',
            items: [
                {
                    key: 'checkbox',
                    value: settings.checkbox,
                    type: 'checkbox',
                    title: i18n('checkboxTitle'),
                    description: i18n('checkboxDescription'),
                },
                // 'textarea'
                {
                    key: 'textarea',
                    value: settings.textarea,
                    type: 'textarea',
                    title: i18n('textAreaTitle'),
                    description: i18n('textAreaDescription'),
                    direction: 'row',
                    rows: 6,
                    placeholder: i18n('textAreaPlaceholder'),
                },
                {
                    key: 'select',
                    value: settings.select,
                    type: 'select',
                    title: i18n('selectTitle'),
                    description: i18n('selectDescription'),
                    options: {
                        option1: i18n('selectOptionsOption1'),
                        option2: i18n('selectOptionsOption2'),
                        option3: i18n('selectOptionsOption3'),
                    },
                },
            ],
        },
        {
            name: i18n('settingsGroupReset') || 'Reset Settings',
            items: [
                {
                    key: 'reset',
                    value: '',
                    type: 'button',
                    title: i18n('resetTitle') || 'Reset Settings',
                    description:
                        i18n('resetDescription') || 'Reset all settings to default values',
                    button: {
                        label: i18n('resetLabel') || 'Reset',
                        callback: async () => {
                            confirm(
                                i18n('resetTitle') || 'Reset Settings',
                                i18n('resetConfirmMessage') ||
                                    'Are you sure you want to reset all settings to default values? This action cannot be undone.',
                                async () => {
                                    // 确认回调
                                    settings = { ...getDefaultSettings() };
                                    updateGroupItems();
                                    await saveSettings();
                                    await pushMsg(i18n('resetMessage'));
                                },
                                () => {
                                    // 取消回调（可选）
                                    console.log('Reset cancelled');
                                }
                            );
                        },
                    },
                },
            ],
        },
        {
            name: '❤️用爱发电',
            items: [
                {
                    key: 'donateInfo',
                    value: '',
                    type: 'hint',
                    title: '用爱发电',
                    description: `
                        <p style="margin-top:12px;">如果喜欢我的插件，欢迎给GitHub仓库点star和微信赞赏，这会激励我继续完善此插件和开发新插件。</p>

                        <div style="margin-top:12px;">
                            <img src="plugins/siyuan-plugin-templates/assets/donate.png" alt="donate" style="max-width:260px; height:auto; border:1px solid var(--b3-border-color);"/>
                        </div>
                    `,
                },
            ],
        }
    ];

    let focusGroup = groups[0].name;

    interface ChangeEvent {
        group: string;
        key: string;
        value: any;
    }

    const onChanged = ({ detail }: CustomEvent<ChangeEvent>) => {
        console.log(detail.key, detail.value);
        const setting = settings[detail.key];
        if (setting !== undefined) {
            settings[detail.key] = detail.value;
            saveSettings();
        }
    };

    async function saveSettings() {
        await plugin.saveSettings(settings);
    }

    onMount(async () => {
        await runload();
    });

    async function runload() {
        const loadedSettings = await plugin.loadSettings();
        settings = { ...loadedSettings };
        updateGroupItems();
    }

    function updateGroupItems() {
        groups = groups.map(group => ({
            ...group,
            items: group.items.map(item => ({
                ...item,
                value: settings[item.key] ?? item.value,
            })),
        }));
    }

    $: currentGroup = groups.find(group => group.name === focusGroup);
</script>

<div class="fn__flex-1 fn__flex config__panel">
    <ul class="b3-tab-bar b3-list b3-list--background">
        {#each groups as group}
            <li
                data-name="editor"
                class:b3-list-item--focus={group.name === focusGroup}
                class="b3-list-item"
                on:click={() => {
                    focusGroup = group.name;
                }}
                on:keydown={() => {}}
            >
                <span class="b3-list-item__text">{group.name}</span>
            </li>
        {/each}
    </ul>
    <div class="config__tab-wrap">
        <SettingPanel
            group={currentGroup?.name || ''}
            settingItems={currentGroup?.items || []}
            display={true}
            on:changed={onChanged}
        />
    </div>
</div>

<style lang="scss">
    .config__panel {
        height: 100%;
        display: flex;
        flex-direction: row;
        overflow: hidden;
    }
    .config__panel > .b3-tab-bar {
        width: min(30%, 170px);
    }

    .config__tab-wrap {
        flex: 1;
        height: 100%;
        overflow: auto;
        padding: 2px;
    }
</style>
