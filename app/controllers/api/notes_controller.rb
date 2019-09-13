class Api::NotesController < ApplicationController
  def index
    render json: @current_user.notes
  end

  def create
    note = @current_user.notes.new(note_params)
    if note.save
      render json: note
    else
      render json: { errors: note.errors }, status: :unprocessable_entity 
    end
  end

  def update
    note = @current_user.notes.find(params[:id])
    if note.update(note_params)
      render json: note
    else
      render json: { errors: note.errors }, status: :unprocessable_entity 
    end
  end

  def destroy
    @current_user.notes.find(params[:id]).destroy
    render json: { message: 'Note deleted' }
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
