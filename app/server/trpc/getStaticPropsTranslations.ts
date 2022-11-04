import { GetStaticProps } from "next";
import { Translation } from "@cms"
import { cmsTrpc } from "lib/clientTrpc";

interface TranslationsProps {
    translations: Translation[]
}

export function getStaticPropsTranslations<T>(cb?: () => T) {
    const getStaticProps: GetStaticProps<GetStaticPropsTranslations<T>> = async (ctx) => {
        const translations = await cmsTrpc.translations.translations.query();

        const furtherProps = cb && cb() || null



        return {
            props: {
                translations,
                furtherProps
            },
        };
    };

    return getStaticProps 
}

export interface GetStaticPropsTranslations<T = {}> extends TranslationsProps {
    furtherProps: T | null
}