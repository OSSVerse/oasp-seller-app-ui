import { render, screen, fireEvent } from '@testing-library/react';
import AnchorLists , { AnchorSection } from '../anchor-list'; // Adjust path as needed

describe('AnchorLists Component', () => {
  const mockAnchorLists = [
    'Description Details',
    'Assessment Service Pricing',
    'Payment',
  ];

  it('renders anchor lists and handles click events', () => {
    const setCurrentAnchor = vi.fn(); // Mock the setCurrentAnchor function

    render(
      <AnchorLists
        currentAnchor={0}
        setCurrentAnchor={setCurrentAnchor}
        anchroLists={mockAnchorLists}
      />
    );

    // Assert that all anchor list items are rendered
    mockAnchorLists.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    // Simulate clicking on the second anchor list item
    fireEvent.click(screen.getByText(mockAnchorLists[1]));

    // Verify that setCurrentAnchor is called with the correct index
    expect(setCurrentAnchor).toHaveBeenCalledWith(1);
  });

  it('highlights the current anchor button', () => {
    const setCurrentAnchor = vi.fn();

    render(
      <AnchorLists
        currentAnchor={1}
        setCurrentAnchor={setCurrentAnchor}
        anchroLists={mockAnchorLists}
      />
    );

    // Assert that the second anchor list item is highlighted
    expect(screen.getByText(mockAnchorLists[1])).toHaveClass('bg-neutral-300');
    expect(screen.getByText(mockAnchorLists[0])).not.toHaveClass('bg-neutral-300');
  });
});

describe('AnchorSection Component', () => {
  const mockAnchorLists = [
    'Description Details',
    'Assessment Service Pricing',
    'Payment',
  ];

  it('renders section when currentAnchor is greater than sectionIndex', () => {
    render(
      <AnchorSection
        currentAnchor={1}
        sectionIndex={0}
        anchroLists={mockAnchorLists}
      >
        <p>Section 0 Content</p>
      </AnchorSection>
    );

    // Assert that the section content is visible
    expect(screen.getByText('Section 0 Content')).toBeInTheDocument();
  });

  it('hides section when sectionIndex is less than currentAnchor', () => {
    render(
      <AnchorSection
        currentAnchor={2}
        sectionIndex={1}
        anchroLists={mockAnchorLists}
      >
        <p>Section 2 Content</p>
      </AnchorSection>
    );
  
    // Assert that the section element is present in the DOM
    const sectionContent = screen.getByText('Section 2 Content');
  
    // Assert that the section has the hidden class applied
    expect(sectionContent.closest('section')).toHaveClass('hidden');
  });
  

  it('renders the section title in uppercase', () => {
    render(
      <AnchorSection
        currentAnchor={0}
        sectionIndex={1}
        anchroLists={mockAnchorLists}
      >
        <p>Section 1 Content</p>
      </AnchorSection>
    );

    // Assert that the section title is in uppercase
    expect(screen.getByText(mockAnchorLists[1].toUpperCase())).toBeInTheDocument();
  });
});
