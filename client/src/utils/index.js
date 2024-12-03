import { ArrowLeftRight, Currency, DollarSign, HandCoins, History, Info, LayoutDashboard, Text, TrendingDown } from "lucide-react";


export const menuItems = [
    {
        id: 1,
        title: 'Dashboard',
        icon: <LayoutDashboard />,
        link: '/dashboard/'
    },
    {
        id: 2,
        title: "View Transactions",
        icon: <ArrowLeftRight />,
        link: "/dashboard/transactions",
    },
    {
        id: 3,
        title: "Incomes",
        icon: <DollarSign />,
        link: "/dashboard/income",
    },
    {
        id: 4,
        title: "Expenses",
        icon: <HandCoins />,
        link: "/dashboard/expenses",
    },
    {
        id: 5,
        title: "Summary",
        icon: <Text />,
        link: "/dashboard/summary",
    },
    {
        id: 6,
        title: "History",
        icon: <History />,
        link: "/dashboard/History",
    },
    {
        id: 7,
        title: "Help",
        icon: <Info />,
        link: "/dashboard/Help",
    },
]

export const filterDataByTimeRange = (data, range) => {
    const now = new Date(); // Get the current date and time
    return data.filter(({ date }) => {
        const itemDate = new Date(date); // Convert item's date string to a Date object

        if (range === "today") {
            // Match today's date
            return itemDate.toDateString() === now.toDateString();
        } else if (range === "thisWeek") {
            // Get the start and end of the current week
            const startOfWeek = new Date(now);
            startOfWeek.setDate(now.getDate() - now.getDay()); // Start of the week (Sunday)
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6); // End of the week (Saturday)
            return itemDate >= startOfWeek && itemDate <= endOfWeek;
        } else if (range === "thisMonth") {
            // Match the current month and year
            return (
                itemDate.getMonth() === now.getMonth() &&
                itemDate.getFullYear() === now.getFullYear()
            );
        }
        return true; // Default case, include all data
    });
};
