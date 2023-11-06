using Eris.Shared.Models;

public interface INetflixClient
{
    Task Back();

    Task Forward();
    
    Task Pause();
    
    Task Play();

    Task Seek(int position);

    Task Volume(int volume);

    Task Status(PlaybackStatus status);
}