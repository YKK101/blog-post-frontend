'use client';
import { lightTheme } from '@/theme/theme';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import HomeIcon from '@/assets/home-icon.svg';
import ToDoIcon from '@/assets/to-do-icon.svg';

export interface IAppMenuItem {
    IconSrc: React.FC<React.SVGProps<SVGSVGElement>>;
    text: string;
    destination: string;
}

export default function MenuItemList({
    fontColor = lightTheme.palette.text.primary,
    onSelected = () => { }
}: {
    fontColor?: string,
    onSelected?: (item: IAppMenuItem) => void
}) {
    const pathname = usePathname();
    const router = useRouter();
    const t = useTranslations('appMenu');

    const menuItems: IAppMenuItem[] = [
        {
            IconSrc: HomeIcon,
            text: t('home'),
            destination: '/'
        },
        {
            IconSrc: ToDoIcon,
            text: t('myBlog'),
            destination: '/our-blog'
        }
    ]

    const handleListItemClick = (item: IAppMenuItem) => (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        onSelected(item);
        router.push(item.destination);
    }


    return (
        <List sx={{ width: '280px' }}>
            {menuItems.map((item) => {
                const { IconSrc, text, destination } = item;
                const isSelected = pathname === destination;
                const fontWeight = isSelected ? 'bold' : 'normal';
                const strokeWidth = isSelected ? 2 : 1.5;

                return (
                    <ListItem key={`app-menu-${text}`} disablePadding>
                        <ListItemButton onClick={handleListItemClick(item)}>
                            <ListItemIcon>
                                <IconSrc width={24} height={24} stroke={fontColor} strokeWidth={strokeWidth} />
                            </ListItemIcon>
                            <ListItemText primary={text} slotProps={{ primary: { sx: { fontWeight, color: fontColor } } }} />
                        </ListItemButton>
                    </ListItem>
                )
            })}
        </List>
    );
}
