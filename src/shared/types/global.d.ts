declare type ValueOf<T> = T[keyof T];

declare module "react-files" {
    import { ReactNode } from "react";

    export interface FilesProps {
        onChange: (files) => void;
        onError?: (error: { code: number; message: string }, file) => void;
        accepts?: string[];
        multiple?: boolean;
        clickable?: boolean;
        maxFiles?: number;
        maxFileSize?: number;
        minFileSize?: number;
        dragActiveClassName?: string;
        children?: ((isDragging: boolean) => React.Element) | ReactNode;
        className?: string;
    }

    export default class Files extends React.Component<FilesProps> {}
}
