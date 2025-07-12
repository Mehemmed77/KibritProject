import { useSelector, useDispatch } from 'react-redux';
import { setFilter, clearFilters } from '../store/FilterSlice';
import { Box, TextField, Select, MenuItem, Button } from '@mui/material';
import type { RootState } from '../store/store';

export interface FilterField {
  type: 'text' | 'number' | 'select';
  name: string;
  label: string;
  options?: string[];
}

interface FilterComponentProps {
  fields: FilterField[];
}

export default function FilterComponent({ fields }: FilterComponentProps) {
  const filters = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      {fields.map((field) => {
        const value = filters[field.name] ?? '';

        if (field.type === 'select') {
          return (
            <Select
              key={field.name}
              value={value}
              label={field.label}
              displayEmpty
              onChange={(e) =>
                dispatch(setFilter({ key: field.name, value: e.target.value }))
              }
            >
              <MenuItem value="">All</MenuItem>
              {field.options?.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </Select>
          );
        }

        return (
          <TextField
            key={field.name}
            label={field.label}
            type={field.type}
            value={value}
            onChange={(e) =>
              dispatch(setFilter({ key: field.name, value: e.target.value }))
            }
          />
        );
      })}

      <Button variant="outlined" onClick={() => dispatch(clearFilters())}>
            Clear
      </Button>
    </Box>
  );
}
