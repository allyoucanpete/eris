public interface INetflixClient
{
    Task Pause();
    
    Task Play();

    Task Volume(int volume);
}