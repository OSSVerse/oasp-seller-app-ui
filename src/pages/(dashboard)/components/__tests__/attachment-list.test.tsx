import { fireEvent, render, screen } from '@testing-library/react';
import Attachments, {type IAttachment } from '../attachment-list'

describe('Attachments Component', () => {
  const mockAttachments: IAttachment[] = [
    {
      id: '1',
      type: 'document',
      title: 'Document Title',
      source: 'https://example.com/document.pdf',
    },
    {
      id: '2',
      type: 'image',
      title: 'Image Title',
      source: 'https://example.com/image.png',
    },
    {
      id: '3',
      type: 'video',
      title: 'Video Title',
      source: 'https://example.com/video.mp4',
    },
    {
      id: '4',
      type: 'audio',
      title: 'Audio Title',
      source: 'https://example.com/audio.mp3',
    },
    {
      id: '5',
      type: 'unsupported',
      title: 'Unsupported Type',
      source: 'https://example.com/unsupported',
    },
  ];

  const mockAttachmentsRoles: IAttachment[] = [
    {
      id: '1',
      type: 'document',
      title: 'Document Title',
      source: 'https://example.com/document.pdf',
    },
    {
      id: '2',
      type: 'image',
      title: 'Image Title',
      source: 'https://example.com/image.png',
    },
    {
      id: '3',
      type: 'video',
      title: 'Video Title',
      source: 'https://example.com/video.mp4',
    },
    {
      id: '4',
      type: 'audio',
      title: 'Audio Title',
      source: 'https://example.com/audio.mp3',
    }
  ];

  beforeEach(() => {
    vi.spyOn(window, 'open').mockImplementation(() => {}); 
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders all attachment types correctly', () => {
    render(<Attachments attachments={mockAttachments} />);

    // Assert that each attachment type is rendered
    expect(screen.getAllByText('Document Title')).toHaveLength(2);
    expect(screen.getByText('Image Title')).toBeInTheDocument();
    expect(screen.getByText('Video Title')).toBeInTheDocument();
    expect(screen.getAllByText('Audio Title')).toHaveLength(2);
    expect(screen.getByText('Unsupported Type')).toBeInTheDocument();

    // Assert the presence of the icons or media elements
    expect(screen.getByRole('link', { name: /Document Title/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Image Title/i })).toBeInTheDocument();
    expect(screen.getByRole('video')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Audio Title/i })).toBeInTheDocument();
    expect(screen.getByText(/Unsupported resource type/i)).toBeInTheDocument();
  });

  it('handles click events for image', () => {
    render(<Attachments attachments={[mockAttachments[1]]} />);
    
    const image = screen.getByRole('img', { name: /Image Title/i });
    expect(image).toBeInTheDocument();

    // Simulate clicking the image
    fireEvent.click(image);
    expect(window.open).toHaveBeenCalledWith(mockAttachments[1].source, '_blank');
  });

  it('renders the correct number of attachments', () => {
    render(<Attachments attachments={mockAttachmentsRoles} />);
    const attachmentElements = screen.getAllByRole('img').length + 
                               screen.getAllByRole('link').length + 
                               screen.getAllByRole('video').length;
    expect(attachmentElements).toBe(mockAttachmentsRoles.length);
  });
});
