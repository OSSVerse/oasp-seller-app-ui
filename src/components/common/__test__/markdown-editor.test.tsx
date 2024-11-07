import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MDEditorWrapper } from '../markdown-editor';

describe('MDEditorWrapper', () => {
    it('renders with default props', () => {
        const onChange = vi.fn();
        render(
            <MDEditorWrapper
                value=""
                onChange={onChange}
                name="editor"
                id="test-editor"
            />
        );

        const editor = screen.getByRole('textbox');
        expect(editor).toBeInTheDocument();
        expect(editor).toHaveAttribute('placeholder', 'Type here..');
        expect(editor).toHaveAttribute('name', 'editor');
        expect(editor).toHaveAttribute('id', 'test-editor');
    });

    it('renders with custom props', () => {
        const onChange = vi.fn();
        render(
            <MDEditorWrapper
                value="Initial content"
                onChange={onChange}
                name="custom-editor"
                id="custom-test-editor"
                placeholder="Custom placeholder"
                height={500}
                required
            />
        );

        const editor = screen.getByRole('textbox');
        expect(editor).toBeInTheDocument();
        expect(editor).toHaveAttribute('placeholder', 'Custom placeholder');
        expect(editor).toHaveAttribute('name', 'custom-editor');
        expect(editor).toHaveAttribute('id', 'custom-test-editor');
        expect(editor).toHaveAttribute('required');
        expect(editor).toHaveValue('Initial content');
    });

    it('calls onChange when content is modified', () => {
        const onChange = vi.fn();
        render(
            <MDEditorWrapper
                value=""
                onChange={onChange}
                name="editor"
                id="test-editor"
            />
        );

        const editor = screen.getByRole('textbox');
        fireEvent.change(editor, { target: { value: 'New content' } });

        expect(onChange).toHaveBeenCalledWith('New content', 'editor');
    });

    it('toggles preview mode when clicking the preview button', () => {
        const onChange = vi.fn();
        render(
            <MDEditorWrapper
                value="# Hello, World!"
                onChange={onChange}
                name="editor"
                id="test-editor"
            />
        );

        const previewButton = screen.getByText('Preview');
        fireEvent.click(previewButton);

        expect(screen.getByText('Continue Editing')).toBeInTheDocument();
        expect(screen.getByText('Hello, World!')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Continue Editing'));

        expect(screen.getByText('Preview')).toBeInTheDocument();
    });
});
