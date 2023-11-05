using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Eris.Server.Hubs;
using Eris.Shared.Models;

namespace Eris.Server.Controllers;

[ApiController]
[Route("api/netflix")]
public class NetflixController : ControllerBase
{
    private readonly IHubContext<NetflixHub, INetflixClient> _hub;
    private readonly ILogger<NetflixController> _logger;

    public NetflixController(IHubContext<NetflixHub, INetflixClient> hub, ILogger<NetflixController> logger)
    {
        _hub = hub;
        _logger = logger;
    }

    [HttpGet]
    public PlaybackStatus Get()
    {
        return new PlaybackStatus(IsPlaying: true, Volume: 100);
    }

    [HttpPost("back")]
    public async Task<PlaybackStatus> Back()
    {
        _logger.LogInformation("Back");
        await _hub.Clients.All.Back();
        return new PlaybackStatus(IsPlaying: false, Volume: 100);
    }

    [HttpPost("forward")]
    public async Task<PlaybackStatus> Forward()
    {
        _logger.LogInformation("Forward");
        await _hub.Clients.All.Forward();
        return new PlaybackStatus(IsPlaying: false, Volume: 100);
    }

    [HttpPost("pause")]
    public async Task<PlaybackStatus> Pause()
    {
        _logger.LogInformation("Pause");
        await _hub.Clients.All.Pause();
        return new PlaybackStatus(IsPlaying: false, Volume: 100);
    }

    [HttpPost("play")]
    public async Task<PlaybackStatus> Play()
    {
        _logger.LogInformation("Play");
        await _hub.Clients.All.Play();
        return new PlaybackStatus(IsPlaying: true, Volume: 100);
    }

    [HttpPut("seek")]
    public async Task<PlaybackStatus> Volume([FromBody] VolumeRequest request)
    {
        _logger.LogInformation("Volume: {}", request.Volume);
        var volume  = Math.Clamp(value: request.Volume, min: 0, max: 100);
        await _hub.Clients.All.Volume(volume);
        return new PlaybackStatus(IsPlaying: true, Volume: volume);
    }

    [HttpPut("volume")]
    public async Task<PlaybackStatus> Volume([FromBody] SeekRequest request)
    {
        _logger.LogInformation("Volume: {}", request.Position);
        var position  = Math.Clamp(value: request.Position, min: 0, max: 7200);
        await _hub.Clients.All.Seek(position);
        return new PlaybackStatus(IsPlaying: true, Volume: 100);
    }
}
