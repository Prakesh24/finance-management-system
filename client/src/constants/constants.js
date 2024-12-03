export const BASE_URL = process.env.REACT_APP_API_URL

export const NAVBAR_ITEMS = [
    // {
    //     title: 'Search',
    //     href: '/public/search',
    // },
    {
        title: 'Contacts',
        href: '/contact',
    },
    {
        title: 'Timing',
        href: '/timing',
    },
    {
        title: 'Review',
        href: '/review',
    },
]

export const ADMIN_NAVBAR_ITEMS = [
    {
        title: 'Mall',
        href: '/admin/mall',
        subItems: [
            {
                title: 'Mall List',
                href: '/admin/mall/list'
            },
            {
                title: 'Create Mall',
                href: '/admin/mall/create'
            },
        ]
    },
    {
        title: 'Store',
        href: '/admin/store',
        subItems: [
            {
                title: 'Store List',
                href: '/admin/store/list'
            },
            {
                title: 'Create Store',
                href: '/admin/store/create'
            },
        ]
    },
    {
        title: 'Locations',
        subItems: [
            {
                title: 'Create',
                href: '/admin/location/create'
            },
            {
                title: 'State list',
                href: '/admin/location/state/list'
            },
            {
                title: 'City list',
                href: '/admin/location/city/list'
            },
        ]
    },
    {
        title: 'Categories',
        subItems: [
            {
                title: 'List Categories',
                href: '/admin/categories/list'
            },
            {
                title: 'Create',
                href: '/admin/categories/create'
            },
        ]
    }
]