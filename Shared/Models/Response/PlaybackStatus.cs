namespace Eris.Shared.Models.Response;

public record PlaybackStatus(int Elapsed, int Duration, Metadata Metadata, bool IsPlaying, int Volume);