import { useState } from 'react';

import { Button } from '@/components/button';
import {
  type FilterElements,
  ROLE_CATEGORY_LIST,
  type RoleCategory,
} from '@/entities/post.ts';

const INVESTMENT_RANGES = [
  { label: '전체', min: undefined, max: undefined },
  { label: '1억 원 미만', min: 0, max: 10000 },
  { label: '1억 원 이상 ~ 5억 원 미만', min: 10000, max: 50000 },
  { label: '5억 원 이상 ~ 10억 원 미만', min: 50000, max: 100000 },
  { label: '10억 원 이상 ~ 50억 원 미만', min: 100000, max: 500000 },
  { label: '50억 원 이상 ~ 100억 원 미만', min: 500000, max: 1000000 },
  { label: '100억 원 이상 ~ 500억 원 미만', min: 1000000, max: 5000000 },
] as const;

type FilterModalProps = {
  filterElements: FilterElements;
  onChangeFilters: (filterElements: FilterElements) => void;
  onClose: () => void;
  onApply: () => void;
};

export const FilterModal = ({
  filterElements,
  onChangeFilters,
  onClose,
  onApply,
}: FilterModalProps) => {
  const [tempFilters, setTempFilters] =
    useState<FilterElements>(filterElements);

  const handleRoleToggle = (role: RoleCategory) => {
    setTempFilters((prev) => ({
      ...prev,
      roles:
        prev.roles?.includes(role) === true
          ? prev.roles.filter((r) => r !== role)
          : [...(prev.roles ?? []), role],
    }));
  };

  const getCurrentInvestmentRange = () => {
    if (tempFilters.investmentMin == null && tempFilters.investmentMax == null)
      return '전체';

    const currentRange = INVESTMENT_RANGES.find(
      (range) =>
        range.min === tempFilters.investmentMin &&
        range.max === tempFilters.investmentMax,
    );

    return currentRange != null ? currentRange.label : '전체';
  };

  const handleInvestmentRangeChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedLabel = e.target.value;
    const range = INVESTMENT_RANGES.find((r) => r.label === selectedLabel);

    setTempFilters((prev) => ({
      ...prev,
      investmentMin: range?.min,
      investmentMax: range?.max,
    }));
  };

  const handleApply = () => {
    onChangeFilters({
      ...tempFilters,
      roles: tempFilters.roles?.length != null ? tempFilters.roles : undefined,
    });
    onApply();
  };

  return (
    <div className="modal">
      <h2>필터링 설정</h2>

      {/* Roles as Checkboxes */}
      <div>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}>
          <span>직무 종류 (roles): </span>
          {ROLE_CATEGORY_LIST.map((role) => (
            <label
              key={role}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <input
                type="checkbox"
                checked={tempFilters.roles?.includes(role) ?? false}
                onChange={() => {
                  handleRoleToggle(role);
                }}
                style={{ width: '16px', height: '16px' }}
              />
              {role}
            </label>
          ))}
        </div>
      </div>

      {/* Investment */}
      <label style={{ display: 'block', marginBottom: '16px' }}>
        투자금액 구간:
        <select
          value={getCurrentInvestmentRange()}
          onChange={handleInvestmentRangeChange}
          style={{ marginLeft: '8px', padding: '4px 8px' }}
        >
          {INVESTMENT_RANGES.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </label>

      {/* Path Status */}
      <label>
        진행 상태 (pathStatus):
        <select
          value={tempFilters.pathStatus ?? ''}
          onChange={(e) => {
            const selected = parseInt(e.target.value, 10);
            setTempFilters((prev) => ({
              ...prev,
              pathStatus:
                selected === 0 || selected === 1 || selected === 2
                  ? selected
                  : undefined,
            }));
          }}
        >
          <option value="0">진행중</option>
          <option value="1">진행 완료</option>
          <option value="2">전부</option>
        </select>
      </label>

      <div className="modal-buttons">
        <Button onClick={onClose}>취소</Button>
        <Button onClick={handleApply}>적용</Button>
      </div>
    </div>
  );
};
