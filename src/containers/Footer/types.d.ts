export interface LinkItemProps {
  name: string;
  url: string;
}

export interface LinksColumnProps {
  title: string;
  links: LinkItemProps[];
}

export interface FooterLinks {
  [key: string]: LinksColumnProps;
}
