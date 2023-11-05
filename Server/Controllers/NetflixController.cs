using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Eris.Shared;
using Eris.Server.Hubs;
using Microsoft.AspNetCore.SignalR;
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
        return new PlaybackStatus(IsPlaying: true);
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

    [HttpPut("volume")]
    public async Task<PlaybackStatus> Volume([FromBody] VolumeRequest request)
    {
        _logger.LogInformation("Volume: {}", request.Volume);
        var volume  = Math.Clamp(value: request.Volume, min: 0, max: 100)''
        await _hub.Clients.All.Volume(volume);
        return new PlaybackStatus(IsPlaying: true, Volume: volume);
    }
}
