import { useState } from 'react';
import styled from 'styled-components';
import { SymbolTree1 } from '../../../assets';

interface MadeProps {
  conditions: boolean;
  setConditions: (value: boolean) => void;
}

const PickTheme = ({ conditions, setConditions }: MadeProps) => {
  const categoryList = ['영화', '음악', '책', '유튜브', 'OTT', '공연'];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    const newSelectedCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newSelectedCategory);

    // 조건 활성화 상태 업데이트
    setConditions(newSelectedCategory !== null);
  };

  return (
    <>
      <Guide>분야를 선택해주세요</Guide>
      <CategoryBox>
        {categoryList.map((category) => (
          <Category
            key={category}
            isSelected={selectedCategory === category}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Category>
        ))}
      </CategoryBox>
    </>
  );
};

export default PickTheme;

const Guide = styled.p`
  margin: 2.4rem 0 1.7rem;
  color: ${({ theme }) => theme.colors.textColor};
  font: ${({ theme }) => theme.fonts.body16_semibold};
`;

const CategoryBox = styled.div`
  display: flex;
  width: 100%;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

interface CategoryProps {
  isSelected: boolean;
}

const Category = styled.div<CategoryProps>`
  padding: 1rem 2rem;
  border: 1px solid ${({ theme }) => theme.colors.textColor};
  font: ${({ theme }) => theme.fonts.body16_medium};
  cursor: pointer;
  background-color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textColor : 'transparent'};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.bgColor : theme.colors.textColor};
  border-color: ${({ theme }) => theme.colors.textColor};

  &:hover {
    opacity: 0.8;
  }
`;
