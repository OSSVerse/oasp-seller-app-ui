import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CheckItem, { type ICheckItem } from '../check-item';
import type { Daum } from "@/services/orders-service";


describe('CheckItem Component', () => {
    it('renders the check item correctly', () => {
        const label = 'Pentesting Service';

        const checkItem: Daum["items"][number] = {
            "descriptor": {
                "name": "RomRaider"
            },
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "category_id": "OSS Project",
            "productSubcategory1": "Pentesting Service",
            "description": "desc",
            "longDescription": "long-desc",
            "quantity": {
                "count": 1,
                "measure": {
                    "unit": "Unit-count",
                    "value": 1
                }
            },
            "details": null
        };

        render(<CheckItem checkItem={checkItem} setSelectedItems={vi.fn()} selectedItems={[]} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('toggles the check item correctly', async () => {
        const checkItem: Daum["items"][number] = {
            "descriptor": {
                "name": "RomRaider"
            },
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "category_id": "OSS Project",
            "productSubcategory1": "Pentesting Service",
            "description": "desc",
            "longDescription": "long-desc",
            "quantity": {
                "count": 1,
                "measure": {
                    "unit": "Unit-count",
                    "value": 1
                }
            },
            "details": null
        };


        const setSelectedItems = vi.fn();
        render(<CheckItem checkItem={checkItem} setSelectedItems={setSelectedItems} selectedItems={[]} />);

        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('aria-checked', 'true');
        expect(checkbox).toBeChecked();

    });

    it('adds the check item to selected items when checked', async () => {
        const checkItem: Daum["items"][number] = {
            "descriptor": {
                "name": "RomRaider"
            },
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "category_id": "OSS Project",
            "productSubcategory1": "Pentesting Service",
            "description": "desc",
            "longDescription": "long-desc",
            "quantity": {
                "count": 1,
                "measure": {
                    "unit": "Unit-count",
                    "value": 1
                }
            },
            "details": null
        };
        const setSelectedItems = vi.fn();
        const selectedItems: ICheckItem[] = [{ id: '1', name: 'Test Item', price: 10 }];
        render(<CheckItem checkItem={checkItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />);
        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('aria-checked', 'true');

    });

    it('removes the check item from selected items when unchecked', async () => {
        const checkItem: Daum["items"][number] = {
            "descriptor": {
                "name": "RomRaider"
            },
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "category_id": "OSS Project",
            "productSubcategory1": "Pentesting Service",
            "description": "desc",
            "longDescription": "long-desc",
            "quantity": {
                "count": 1,
                "measure": {
                    "unit": "Unit-count",
                    "value": 1
                }
            },
            "details": null
        };
        const setSelectedItems = vi.fn();
        const selectedItems = [checkItem];
        render(<CheckItem checkItem={checkItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} />);
        const checkbox = screen.getByRole('checkbox');
        checkbox.setAttribute('aria-checked', 'false');
        expect(checkbox).not.toBeChecked();
    });

    it('disables the checkbox when disabledLength is true and item is not selected', async () => {
        const checkItem: Daum["items"][number] = {
            "descriptor": {
                "name": "RomRaider"
            },
            "price": {
                "currency": "INR",
                "value": "11000"
            },
            "category_id": "OSS Project",
            "productSubcategory1": "Pentesting Service",
            "description": "desc",
            "longDescription": "long-desc",
            "quantity": {
                "count": 1,
                "measure": {
                    "unit": "Unit-count",
                    "value": 1
                }
            },
            "details": null
        };
        const setSelectedItems = vi.fn();
        const selectedItems: ICheckItem[] = [];
        const disabledLength = true;
        render(<CheckItem checkItem={checkItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} disabledLength={disabledLength} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeDisabled();
    });

    // it('enables the checkbox when disabledLength is true and item is selected', async () => {
    //     const checkItem = { id: '1', name: 'Test Item', price: 10, icon: '', qty: 1 };
    //     const setSelectedItems = vi.fn();
    //     const selectedItems = [checkItem];
    //     const disabledLength = true;

    //     render(<CheckItem checkItem={checkItem} setSelectedItems={setSelectedItems} selectedItems={selectedItems} disabledLength={disabledLength} />);

    //     const checkbox = screen.getByRole('checkbox');
    //     expect(checkbox).not.toBeDisabled();
    // });
});
