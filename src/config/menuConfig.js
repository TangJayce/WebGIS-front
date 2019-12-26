export default [
    {
        title: '首页',
        key: '/admin/home'
    },
    {
        title: 'UI',
        key: '/admin/ui',
        children: [
            {
                title: '按钮',
                key: '/admin/ui/buttons'
            },
            {
                title: '弹框',
                key: '/admin/ui/modals'
            },
            {
                title: '加载框',
                key: '/admin/ui/spins'
            },
            {
                title: '通知提醒框',
                key: '/admin/ui/notifications'
            },
            {
                title: '表格',
                key: '/admin/ui/table'
            }
        ]
    },
    {
        title: '表单',
        key: '/admin/form',
        children: [
            {
                title: '登录',
                key: '/admin/form/login'
            },
            {
                title: '注册',
                key: '/admin/form/register'
            }
        ]
    },
    {
        title: '地图',
        key: '/admin/map',
        children: [
            {
                title: '定位',
                key: '/admin/map/position'
            },
            {
                title: '多源数据',
                key: '/admin/map/layers'
            },
            {
                title: '图层加载',
                key: '/admin/map/load'
            },
            {
                title: '图层编辑',
                key: '/admin/map/edit'
            }
        ]
    },
    {
        title: 'AntV地图',
        key: '/admin/antv'
    },
    {
        title: '测试',
        key: '/admin/test'
    }
]