import React from 'react'
import './App.css'

const modules = [
  { name: 'parse_args()', desc: 'Parses CLI flags: interface, channel, skip MAC, max clients, packet count, world mode.' },
  { name: 'get_mon_iface()', desc: 'Detects or selects a wireless interface and switches it to monitor mode.' },
  { name: 'iwconfig()', desc: 'Runs the system iwconfig command to list wireless interfaces and monitor-mode adapters.' },
  { name: 'start_mon_mode()', desc: 'Brings the interface down, sets it to monitor mode, then brings it back up.' },
  { name: 'channel_hop()', desc: 'Cycles through Wi-Fi channels (1–11 or 1–13) to discover APs and clients on each.' },
  { name: 'deauth()', desc: 'Constructs and sends Dot11Deauth frames to disconnect clients from their access points.' },
  { name: 'cb() (sniff callback)', desc: 'Processes each captured packet — identifies APs via beacons and tracks client pairs.' },
  { name: 'APs_add()', desc: 'Extracts BSSID, channel, and ESSID from beacon/probe-response packets.' },
  { name: 'clients_APs_add()', desc: 'Records client↔AP associations from data and management frames.' },
  { name: 'output()', desc: 'Clears the terminal and prints a live table of deauthing clients and discovered APs.' },
  { name: 'stop()', desc: 'Handles Ctrl+C — restores managed mode and restarts NetworkManager on exit.' },
]

const args = [
  { flag: '-i, --interface', desc: 'Specify monitor-mode interface' },
  { flag: '-c, --channel', desc: 'Listen on and target a specific channel' },
  { flag: '-s, --skip', desc: 'Skip deauthing this MAC address' },
  { flag: '-a, --accesspoint', desc: 'Target a specific AP MAC address' },
  { flag: '-m, --maximum', desc: 'Max number of clients to deauth' },
  { flag: '-p, --packets', desc: 'Number of deauth packets per burst (default: 1)' },
  { flag: '-t, --timeinterval', desc: 'Time interval between packet bursts' },
  { flag: '-d, --directedonly', desc: 'Skip broadcast deauth to APs' },
  { flag: '-n, --noupdate', desc: 'Do not clear deauth list when max is reached' },
  { flag: '--world', desc: 'Enable scanning of channels 1–13' },
]

const flowSteps = [
  { title: '1. Interface Setup', desc: 'Detect wireless adapter → enable monitor mode via iwconfig' },
  { title: '2. Channel Hopping', desc: 'Cycle through channels 1–11 (or 1–13) to discover all APs and clients' },
  { title: '3. Packet Sniffing', desc: 'Scapy sniffs 802.11 frames — beacons, probe responses, data frames' },
  { title: '4. Target Identification', desc: 'Callback extracts BSSID, ESSID, channel, and client↔AP pairs' },
  { title: '5. Deauth Injection', desc: 'Forged Dot11Deauth frames sent to disconnect clients from their AP' },
  { title: '6. Live Display', desc: 'Terminal shows real-time table of targets and discovered access points' },
]

const defenses = [
  { title: '802.11w (PMF)', desc: 'Protected Management Frames encrypts deauth frames, making forged ones rejected by the client.' },
  { title: 'WPA3', desc: 'Requires PMF by default, eliminating most deauth attack vectors.' },
  { title: 'Intrusion Detection', desc: 'Tools like Wireshark, Kismet, or Zeek can detect abnormal deauth frame patterns.' },
  { title: 'AP Logging', desc: 'Modern APs log deauth events — sudden bursts indicate an active attack.' },
]

export default function App() {
  return (
    <div className="app">
      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">📶 WiFi Deauth Tool</div>
        <div className="nav-links">
          <a href="#overview">Overview</a>
          <a href="#how">How It Works</a>
          <a href="#modules">Modules</a>
          <a href="#cli">CLI Usage</a>
          <a href="#defenses">Defenses</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-badge">⚠ Educational Purpose Only</div>
        <h1>Wi-Fi Deauthentication <span className="highlight">Tool</span></h1>
        <p>
          A Python-based tool using Scapy that demonstrates 802.11 deauthentication
          attacks — how they work, why they succeed, and how to defend against them.
        </p>
        <div className="hero-cta">
          <a href="#how" className="btn btn-primary">How It Works →</a>
          <a href="#modules" className="btn btn-ghost">View Modules</a>
        </div>
        <div className="stats">
          <div className="stat">
            <div className="stat-num">11</div>
            <div className="stat-label">Functions</div>
          </div>
          <div className="stat">
            <div className="stat-num">10</div>
            <div className="stat-label">CLI Flags</div>
          </div>
          <div className="stat">
            <div className="stat-num">1–13</div>
            <div className="stat-label">Channels</div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="section" id="overview">
        <h2 className="section-title">Project <span className="accent">Overview</span></h2>
        <p className="section-subtitle">
          This tool demonstrates a well-known vulnerability in the 802.11 protocol:
          management frames (including deauthentication frames) are sent unencrypted
          and unauthenticated in networks without Protected Management Frames (PMF).
        </p>
        <div className="cards-grid">
          <div className="card">
            <div className="card-icon">🐍</div>
            <h3>Built with Scapy</h3>
            <p>Uses the Scapy library for packet crafting, sniffing, and injection of 802.11 frames.</p>
          </div>
          <div className="card">
            <div className="card-icon">📡</div>
            <h3>Monitor Mode</h3>
            <p>Requires a wireless adapter supporting monitor mode to sniff and inject raw frames.</p>
          </div>
          <div className="card">
            <div className="card-icon">⚡</div>
            <h3>Real-Time Sniffing</h3>
            <p>Live packet capture identifies APs and clients across all Wi-Fi channels via channel hopping.</p>
          </div>
          <div className="card">
            <div className="card-icon">🧵</div>
            <h3>Multi-Threaded</h3>
            <p>Channel hopping runs in a daemon thread while the main thread handles packet sniffing.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <h2 className="section-title">How It <span className="accent">Works</span></h2>
        <p className="section-subtitle">
          The tool follows a six-stage pipeline — from interface setup to deauth injection.
        </p>
        <div className="flow">
          {flowSteps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="flow-step">
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
              {i < flowSteps.length - 1 && <div className="flow-arrow">↓</div>}
            </React.Fragment>
          ))}
        </div>

        <h3 style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '1.15rem' }}>
          The Deauth Frame
        </h3>
        <p style={{ color: 'var(--text-dim)', fontSize: '0.92rem', marginBottom: '1rem' }}>
          A deauthentication frame is a management frame (type 0, subtype 12) that tells
          a station it has been disconnected. Because these frames are unauthenticated in
          networks without PMF, an attacker can forge them:
        </p>
        <div className="code-block">
          <pre>{`# Forged deauth frame (Scapy)
deauth = (
    RadioTap() /
    Dot11(
        addr1=client_mac,   # destination (client)
        addr2=ap_mac,        # source (spoofed AP)
        addr3=ap_mac         # BSSID
    ) /
    Dot11Deauth(
        reason=7             # Class 3 frame from non-associated station
    )
)

sendp(deauth, iface=mon_iface, count=5, inter=0.1)`}</pre>
        </div>
      </section>

      {/* MODULES */}
      <section className="section" id="modules">
        <h2 className="section-title">Code <span className="accent">Modules</span></h2>
        <p className="section-subtitle">
          The tool is organized into focused functions, each handling a specific stage.
        </p>
        <div className="module-list">
          {modules.map((m, i) => (
            <div className="module-item" key={i}>
              <div className="module-name">{m.name}</div>
              <div className="module-desc">{m.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CLI USAGE */}
      <section className="section" id="cli">
        <h2 className="section-title">CLI <span className="accent">Usage</span></h2>
        <p className="section-subtitle">
          The tool runs as root with various command-line flags for targeting and control.
        </p>
        <div className="code-block">
          <pre>{`# Basic usage (requires root + monitor mode adapter)
sudo python3 wifi_jammer.py

# Target a specific access point on channel 6
sudo python3 wifi_jammer.py -a AA:BB:CC:DD:EE:FF -c 6

# Send 5 deauth packets per burst, world channels
sudo python3 wifi_jammer.py -p 5 --world

# Skip a specific client, directed only
sudo python3 wifi_jammer.py -s 11:22:33:44:55:66 -d`}</pre>
        </div>
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', fontSize: '1.15rem' }}>
          Command-Line Arguments
        </h3>
        <div className="arg-table-wrap">
          <table className="arg-table">
            <thead>
              <tr>
                <th>Flag</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {args.map((a, i) => (
                <tr key={i}>
                  <td>{a.flag}</td>
                  <td>{a.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DEFENSES */}
      <section className="section" id="defenses">
        <h2 className="section-title">Defenses & <span className="accent">Mitigations</span></h2>
        <p className="section-subtitle">
          Understanding the attack is the first step to defending against it. Here are key mitigations.
        </p>
        <div className="defense-grid">
          {defenses.map((d, i) => (
            <div className="defense-card" key={i}>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="section">
        <div className="disclaimer">
          <h3>⚠ Legal & Ethical Disclaimer</h3>
          <p>
            This tool is presented for educational purposes only. Using deauthentication
            attacks against networks you do not own or have explicit permission to test
            is illegal in most jurisdictions. Always practice in controlled lab environments
            with your own equipment. The authors and presenters of this project assume no
            responsibility for misuse.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>Wi-Fi Deauthentication Tool — Educational Project Presentation</p>
        <p style={{ marginTop: '0.5rem' }}>Built with Python · Scapy · React</p>
      </footer>
    </div>
  )
}
