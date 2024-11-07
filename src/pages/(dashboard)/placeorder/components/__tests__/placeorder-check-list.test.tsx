import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PlaceOrderCheckList from "../placeorder-check-list";
import type { ServiceOrder } from "../../../components/order-list";
import { MemoryRouter } from "react-router-dom";
import type { Daum } from "@/services/orders-service";

const mockItems: Daum["items"] = [
    {
        "descriptor": {
            "name": "RomRaider"
        },
        "price": {
            "currency": "INR",
            "value": "11000"
        },
        "category_id": "OSS Project",
        "productSubcategory1": "Assurance & Assessment Service",
        "description": "Assurance & Assessment Service",
        "longDescription": "Assurance & Assessment Service",
        "quantity": {
            "count": 1,
            "measure": {
                "unit": "Unit-count",
                "value": 1
            }
        },
        "details": null
    },
    {
        "descriptor": {
            "name": "RomRaider"
        },
        "price": {
            "currency": "INR",
            "value": "11000"
        },
        "category_id": "OSS Project",
        "productSubcategory1": "Validation & Verification Service",
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
    },
    {
        "descriptor": {
            "name": "RomRaider"
        },
        "price": {
            "currency": "INR",
            "value": "11000"
        },
        "category_id": "OSS Project",
        "productSubcategory1": "Remediation Service",
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
    },
    {
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
    },
    {
        "descriptor": {
            "name": "RomRaider"
        },
        "price": {
            "currency": "INR",
            "value": "11000"
        },
        "category_id": "OSS Project",
        "productSubcategory1": "Feature Addition",
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
    },
    {
        "descriptor": {
            "name": "RomRaider"
        },
        "price": {
            "currency": "INR",
            "value": "11000"
        },
        "category_id": "OSS Project",
        "productSubcategory1": "TAVOSS Version & Certification Service",
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
    }
]


describe("PlaceOrderCheckList", () => {


    const mockSetSelectedItems = vi.fn();

    it("renders all check items", () => {
        render(
            <MemoryRouter>
                <PlaceOrderCheckList
                    items={mockItems}
                    setSelectedItems={mockSetSelectedItems}
                />
            </MemoryRouter>,
        );
        for (const item of mockItems) {
            expect(
                screen.getByTestId(`check-item-${item.productSubcategory1}`)
            ).toBeInTheDocument();
        }
    });

    it("renders with correct wrapper classes", () => {
        const { container } = render(
            <PlaceOrderCheckList
                items={mockItems}
                setSelectedItems={mockSetSelectedItems}
            />
        );

        const wrapper = container.firstChild;
        expect(wrapper).toHaveClass(
            "overflow-auto",
            "h-[250px]",
            "w-full",
            "flex",
            "gap-2",
            "flex-wrap",
            "content-start",
            "mb-10"
        );
    });

    it("renders empty list when no items provided", () => {
        render(
            <MemoryRouter>
                <PlaceOrderCheckList items={[]} setSelectedItems={mockSetSelectedItems} />
            </MemoryRouter>,
        );

        const wrapper = screen.getByTestId("placeorder-check-list");
        expect(wrapper.children).toHaveLength(0);
    });

    // it("passes disabledLength prop to CheckItems", () => {
    //     render(
    //         <MemoryRouter>
    //             <PlaceOrderCheckList
    //                 items={mockItems}
    //                 setSelectedItems={mockSetSelectedItems}
    //                 disabledLength={true}
    //             />
    //         </MemoryRouter>,
    //     );

    //     mockItems.forEach((item) => {
    //         const checkItem = screen.getByTestId(`check-item-${item.id}`);
    //         expect(checkItem).toHaveAttribute("disabledlength", "true");
    //     });
    // });
});
