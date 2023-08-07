import React from "react"
import { styled } from "styled-components"

interface SortButtonProps {
    handleSortByOldest: () => void;
    handleSortByNewest: () => void;
    handleSortByLikeCount: () => void;
    activeSort: "Oldest" | "Newest" | "LikeCount";
}

const SortButton: React.FC<SortButtonProps> = ({
    handleSortByOldest,
    handleSortByNewest,
    handleSortByLikeCount,
    activeSort
}) => {
    const sortlist = [
        {
            id: 1,
            sort: "최신순",
            activeSort: "Newest",
            onClick: handleSortByNewest
        },
        {
            id: 2,
            sort: "과거순",
            activeSort: "Oldest",
            onClick: handleSortByOldest
        },
        {
            id: 3,
            sort: "좋아요순",
            activeSort: "LikeCount",
            onClick: handleSortByLikeCount
        },
    ]

    return (
        <SortList>
            {
                sortlist.map(item => {
                    const isActive = activeSort === item.activeSort;                    
                    return (
                        <SortListItem
                            key={item.id}
                            onClick={item.onClick}
                            $active={isActive ? "true" : "false"}
                        >
                            {item.sort}
                        </SortListItem>
                    )
                })
            }
        </SortList>
    )
}

export default SortButton

const SortList = styled.div`
    display: flex;
    gap: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;
`

const SortListItem = styled.div<{ $active: string }>`
    background-color: ${(props) => (props.$active === "true" ? "black" : "#D2D2D2")};
    color: ${(props) => (props.$active === "true"  ? "white" : "black")};
    border-radius: 30px;

    padding: 8px 16px;
    text-align: center;

    box-sizing: border-box;
    cursor: pointer;

    &:hover{
        opacity: 0.7;
    }
`