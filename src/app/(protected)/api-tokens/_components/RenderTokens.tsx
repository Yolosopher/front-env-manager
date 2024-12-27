"use client";
import { useEffect, useState } from "react";
import TokenItem from "./TokenItem";
import { Skeleton } from "@/components/ui/skeleton";

type RenderTokensProps = {
    tokens: ApiToken[];
    isLoadingApiTokens: boolean;
};

const TOKEN_ITEM_DEFAULT_WIDTH = 250;
const TOKEN_ITEM_GAP = 24;
const TOKEN_ITEM_SIDE_PADDING_TOTAL = 48;

const RenderTokens = ({ tokens, isLoadingApiTokens }: RenderTokensProps) => {
    const [tokenItemWidth, setTokenItemWidth] = useState(
        TOKEN_ITEM_DEFAULT_WIDTH
    );

    useEffect(() => {
        const handleResize = () => {
            setTokenItemWidth(
                (window.innerWidth -
                    TOKEN_ITEM_SIDE_PADDING_TOTAL -
                    TOKEN_ITEM_GAP) /
                    2
            );
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="grid md:grid-cols-2 gap-6 w-full h-min">
            {isLoadingApiTokens
                ? Array.from({ length: 16 }).map((_, i) => (
                      <div key={i} className="flex w-full h-[36px]">
                          <Skeleton
                              className={`h-full w-full rounded-2xl bg-primary/30 p-7 flex justify-center items-center`}
                          />
                      </div>
                  ))
                : tokens.map((token) => (
                      <TokenItem
                          key={token.id}
                          token={token}
                          width={tokenItemWidth}
                      />
                  ))}
        </div>
    );
};

export default RenderTokens;
