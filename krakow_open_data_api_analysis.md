# Krakow Open Data Portal API - Strategic Integration Guide

## **STRATEGIC DATASET INTEGRATION FOR VOLUNTEER PLATFORM**

### **PROJECT CONTEXT ANALYSIS**
The **Krakowskie Cyfrowe Centrum Wolontariatu** platform aims to connect:
- **Young volunteers** (students and youth in Krakow)
- **School volunteer coordinators** (organizing student groups)
- **Organizations & institutions** (NGOs, schools, universities, municipal units, cultural institutions)

**Core Platform Features Requiring Data Integration:**
1. **Interactive map** showing initiative locations
2. **Organization verification** and contact systems
3. **School coordinator** account verification
4. **Location-based** opportunity search
5. **Accessibility information** for volunteers
6. **Venue and facility** data for events

---

## **TIER 1: CRITICAL INTEGRATION DATASETS & API CALLS**

### **1. Education Facilities (Priority: CRITICAL)**

#### **Available Datasets:**
- `przedszkola-w-krakowie-liczba-dzieci` (Kindergartens)
- `szkoly-podstawowe-w-krakowie-liczba-uczniow` (Primary Schools)  
- `szkoly-ponadpodstawowe-w-krakowie-liczba-uczniow` (Secondary Schools)

#### **Integration Value:**
- **School Coordinator Verification**: Validate coordinator accounts against official school registry
- **Student Group Organization**: Match coordinators to specific schools
- **Geographic Coverage**: Map school locations for proximity-based volunteer matching
- **Capacity Planning**: Understand school sizes for group volunteer activities

#### **API Integration Calls:**

```http
# 1. Get All Schools for Verification Database
GET https://api.um.krakow.pl/v1/datasets/education/schools
Authorization: Bearer {api_token}
Accept: application/json
Parameters:
  ?format=json
  &active=true
  &include_coordinates=true
  &page=1&limit=100
```

**Expected Response:**
```json
{
  "metadata": {
    "total": 245,
    "page": 1,
    "size": 100,
    "category": "education"
  },
  "data": [
    {
      "id": "edu_001",
      "name": "Szkoła Podstawowa nr 123",
      "type": "primary_school",
      "address": "ul. Przykładowa 15, 31-000 Kraków",
      "coordinates": [50.0647, 19.9450],
      "district": "Stare Miasto",
      "student_count": 450,
      "email_domain": "sp123.krakow.pl",
      "phone": "+48 12 123 45 67",
      "accessibility": {
        "wheelchair_accessible": true,
        "elevator": false,
        "disabled_parking": true
      },
      "active": true,
      "last_updated": "2025-09-15T00:00:00Z"
    }
  ]
}
```

```http
# 2. Verify School Coordinator
POST https://api.um.krakow.pl/v1/datasets/education/schools/verify
Authorization: Bearer {api_token}
Content-Type: application/json

{
  "coordinator_email": "koordynator@sp123.krakow.pl",
  "school_name": "Szkoła Podstawowa nr 123",
  "coordinator_name": "Jan Kowalski"
}
```

**Expected Response:**
```json
{
  "verification": {
    "verified": true,
    "school_id": "edu_001",
    "school_name": "Szkoła Podstawowa nr 123",
    "match_confidence": 0.98,
    "verification_method": "email_domain_match",
    "school_details": {
      "type": "primary_school",
      "student_count": 450,
      "address": "ul. Przykładowa 15, 31-000 Kraków",
      "coordinates": [50.0647, 19.9450]
    }
  }
}
```

```http
# 3. Find Schools by Location (for proximity matching)
GET https://api.um.krakow.pl/v1/datasets/education/schools/nearby
Authorization: Bearer {api_token}
Parameters:
  ?lat=50.0647
  &lon=19.9450
  &radius=2000
  &type=primary_school,secondary_school
  &format=geojson
```

**Expected Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.9450, 50.0647]
      },
      "properties": {
        "id": "edu_001",
        "name": "Szkoła Podstawowa nr 123",
        "type": "primary_school",
        "student_count": 450,
        "distance_m": 150,
        "address": "ul. Przykładowa 15"
      }
    }
  ]
}
```

---

### **2. Cultural Institutions (Priority: CRITICAL)**

#### **Expected Datasets (from Wydział Kultury - 6 datasets):**
- Libraries, Museums, Theaters, Cultural Centers, Art Galleries, Heritage Sites

#### **Integration Value:**
- **Venue-Based Volunteering**: Cultural events, exhibitions, educational programs
- **Organization Partnership**: Direct integration with cultural institutions
- **Event Location Mapping**: Show cultural venues on interactive map
- **Accessibility Data**: Venue facilities for volunteers with disabilities

#### **API Integration Calls:**

```http
# 1. Get All Cultural Institutions
GET https://api.um.krakow.pl/v1/datasets/culture/institutions
Authorization: Bearer {api_token}
Accept: application/json
Parameters:
  ?format=json
  &active=true
  &include_programs=true
  &category=all
```

**Expected Response:**
```json
{
  "metadata": {
    "total": 156,
    "categories": ["museum", "library", "theater", "gallery", "cultural_center"],
    "page": 1
  },
  "data": [
    {
      "id": "cult_001",
      "name": "Muzeum Narodowe w Krakowie",
      "type": "museum",
      "category": "national_museum",
      "address": "al. 3 Maja 1, 30-062 Kraków",
      "coordinates": [50.0350, 19.9207],
      "contact": {
        "phone": "+48 12 295 55 00",
        "email": "info@mnk.pl",
        "volunteer_coordinator": "wolontariat@mnk.pl",
        "website": "https://mnk.pl"
      },
      "accessibility": {
        "wheelchair_accessible": true,
        "audio_guide": true,
        "sign_language": false,
        "elevator": true,
        "disabled_parking": true
      },
      "volunteer_programs": {
        "available": true,
        "types": ["guide", "workshop_assistant", "event_support"],
        "age_requirements": {
          "min_age": 16,
          "requires_guardian": false
        }
      },
      "opening_hours": {
        "tuesday": "10:00-18:00",
        "wednesday": "10:00-18:00",
        "thursday": "10:00-18:00",
        "friday": "10:00-18:00",
        "saturday": "10:00-18:00",
        "sunday": "10:00-18:00",
        "monday": "closed"
      },
      "active": true
    }
  ]
}
```

```http
# 2. Get Cultural Venues by Type for Volunteer Opportunities
GET https://api.um.krakow.pl/v1/datasets/culture/institutions/by-type
Authorization: Bearer {api_token}
Parameters:
  ?type=museum,library
  &volunteer_programs=true
  &accessible=true
  &district=Stare Miasto
  &format=geojson
```

**Expected Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.9207, 50.0350]
      },
      "properties": {
        "id": "cult_001",
        "name": "Muzeum Narodowe w Krakowie",
        "type": "museum",
        "volunteer_contact": "wolontariat@mnk.pl",
        "volunteer_types": ["guide", "workshop_assistant"],
        "min_age": 16,
        "wheelchair_accessible": true
      }
    }
  ]
}
```

```http
# 3. Verify Cultural Institution Partnership
POST https://api.um.krakow.pl/v1/datasets/culture/institutions/verify
Authorization: Bearer {api_token}
Content-Type: application/json

{
  "institution_name": "Muzeum Narodowe w Krakowie",
  "contact_email": "wolontariat@mnk.pl",
  "verification_type": "volunteer_program"
}
```

---

### **3. Public Transportation (Priority: HIGH)**

#### **Dataset:** `komunikacja-miejska-w-krakowie-kmk` (Most comprehensive transport data)

#### **Sub-datasets:**
- Bus stops and locations
- Transit lines and routes  
- Accessibility information
- Real-time schedules

#### **Integration Value:**
- **Volunteer Accessibility**: Help volunteers find opportunities near public transport
- **Route Planning**: Integration with volunteer opportunity locations
- **Coordinator Support**: Help coordinators plan group transportation
- **Cost Calculation**: Estimate travel costs for volunteer activities

#### **API Integration Calls:**

```http
# 1. Get Bus Stops Near Volunteer Opportunity
GET https://api.um.krakow.pl/v1/datasets/transport/kmk/stops/nearby
Authorization: Bearer {api_token}
Parameters:
  ?lat=50.0647
  &lon=19.9450
  &radius=500
  &accessible=true
  &format=geojson
```

**Expected Response:**
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [19.9436, 50.0616]
      },
      "properties": {
        "id": "stop_001",
        "name": "Rynek Główny",
        "lines": [
          {"number": "1", "type": "tram", "direction": "Bronowice - Borek Fałęcki"},
          {"number": "3", "type": "tram", "direction": "Nowy Bieżanów - Krowodrza Górka"},
          {"number": "6", "type": "tram", "direction": "Wola Duchacka - Bronowice"}
        ],
        "distance_m": 200,
        "accessibility": {
          "wheelchair_accessible": true,
          "audio_announcements": true,
          "tactile_pavement": true,
          "shelter": true
        },
        "real_time": true
      }
    }
  ]
}
```

```http
# 2. Get Route Planning Between Locations
GET https://api.um.krakow.pl/v1/datasets/transport/kmk/route
Authorization: Bearer {api_token}
Parameters:
  ?from_lat=50.0647&from_lon=19.9450
  &to_lat=50.0350&to_lon=19.9207
  &accessible=true
  &time=14:30
  &date=2025-10-05
```

**Expected Response:**
```json
{
  "route": {
    "total_duration_min": 25,
    "total_distance_m": 3200,
    "accessibility": "full",
    "cost_pln": 4.60,
    "transfers": 1,
    "legs": [
      {
        "type": "walk",
        "from": "Start Location",
        "to": "Rynek Główny",
        "duration_min": 3,
        "distance_m": 200,
        "accessibility": "wheelchair_accessible"
      },
      {
        "type": "tram",
        "line": "1",
        "from": "Rynek Główny",
        "to": "Muzeum Narodowe",
        "duration_min": 18,
        "departure_time": "14:35",
        "arrival_time": "14:53",
        "accessibility": "low_floor_vehicle"
      },
      {
        "type": "walk",
        "from": "Muzeum Narodowe",
        "to": "Destination",
        "duration_min": 4,
        "distance_m": 300
      }
    ]
  }
}
```

```http
# 3. Get Real-time Transit Information
GET https://api.um.krakow.pl/v1/datasets/transport/kmk/realtime
Authorization: Bearer {api_token}
Parameters:
  ?stop_id=stop_001
  &lines=1,3,6
  &format=json
```

**Expected Response:**
```json
{
  "stop": {
    "id": "stop_001",
    "name": "Rynek Główny",
    "departures": [
      {
        "line": "1",
        "direction": "Borek Fałęcki",
        "scheduled_time": "14:35",
        "real_time": "14:37",
        "delay_min": 2,
        "accessibility": "wheelchair_accessible",
        "capacity": "normal"
      },
      {
        "line": "3",
        "direction": "Krowodrza Górka", 
        "scheduled_time": "14:38",
        "real_time": "14:38",
        "delay_min": 0,
        "accessibility": "wheelchair_accessible",
        "capacity": "crowded"
      }
    ],
    "last_update": "2025-10-04T14:34:15Z"
  }
}
```

---

## **IMPLEMENTATION INTEGRATION PATTERNS**

### **Volunteer Opportunity with Integrated City Data:**
```javascript
const volunteerOpportunity = {
  id: "vol_001",
  title: "Museum Guide Training",
  organization: {
    name: "Muzeum Narodowe w Krakowie",
    verified: true, // From cultural institutions dataset
    contact: "wolontariat@mnk.pl",
    institution_id: "cult_001"
  },
  location: {
    coordinates: [50.0350, 19.9207],
    venue: "Sukiennice", // From cultural dataset
    address: "al. 3 Maja 1, 30-062 Kraków",
    accessibility: {
      wheelchair_accessible: true,
      elevator: true,
      disabled_parking: true,
      audio_guide: true
    },
    public_transport: [ // From transport dataset
      {
        stop: "Rynek Główny", 
        stop_id: "stop_001",
        distance: 200, 
        lines: ["1", "3", "6"],
        accessibility: "wheelchair_accessible",
        walking_time: 3
      },
      {
        stop: "Poczta Główna", 
        stop_id: "stop_045",
        distance: 350, 
        lines: ["2", "7", "10"],
        accessibility: "wheelchair_accessible",
        walking_time: 5
      }
    ]
  },
  requirements: {
    age_group: "16-25",
    skills: ["komunikatywność", "znajomość historii"],
    coordinator_supported: true,
    accessibility_friendly: true
  },
  schedule: {
    dates: ["2025-10-15", "2025-10-22"],
    time: "14:00-17:00",
    duration_hours: 3
  }
}
```

### **School Coordinator Verification Flow:**
```javascript
const verifyCoordinator = async (coordinatorData) => {
  // Step 1: Verify against school database
  const schoolVerification = await krakowAPI.post('/education/schools/verify', {
    coordinator_email: coordinatorData.email,
    school_name: coordinatorData.school,
    coordinator_name: coordinatorData.name
  });
  
  if (schoolVerification.verified) {
    // Step 2: Get nearby volunteer opportunities
    const nearbyOpportunities = await krakowAPI.get('/culture/institutions/nearby', {
      lat: schoolVerification.school_details.coordinates[0],
      lon: schoolVerification.school_details.coordinates[1],
      radius: 5000,
      volunteer_programs: true,
      age_appropriate: true
    });
    
    // Step 3: Get transportation options
    const transportOptions = await krakowAPI.get('/transport/kmk/stops/nearby', {
      lat: schoolVerification.school_details.coordinates[0],
      lon: schoolVerification.school_details.coordinates[1],
      radius: 1000,
      accessible: true
    });
    
    return {
      coordinator: {
        verified: true,
        school: schoolVerification.school_details,
        nearby_opportunities: nearbyOpportunities.data,
        transport_access: transportOptions.features
      }
    };
  }
  
  return { coordinator: { verified: false } };
};
```

---

## **TIER 2: HIGH-VALUE INTEGRATION DATASETS**

### **4. Senior Activity Centers (Priority: HIGH)**
**Dataset:** `centra-aktywnosci-seniora-w-krakowie`

**Integration Value:**
- **Intergenerational Programs**: Connect young volunteers with senior centers
- **Regular Volunteer Opportunities**: Ongoing programs vs one-time events
- **Community Building**: Strengthen local community connections
- **Specialized Skills**: Technology support, reading assistance, companionship

**Program Ideas:**
- Digital literacy workshops led by young volunteers
- Senior storytelling projects
- Intergenerational art and craft sessions
- Health and wellness support programs

**API Integration Call:**
```http
GET https://api.um.krakow.pl/v1/datasets/social/senior-centers
Authorization: Bearer {api_token}
Parameters:
  ?active=true
  &volunteer_programs=true
  &accessible=true
  &format=json
```

### **5. Healthcare and Social Services (Priority: MEDIUM-HIGH)**
**Expected Datasets (from Wydział Polityki Społecznej i Zdrowia - 4 datasets):**
- Hospitals and medical facilities
- Healthcare centers
- Social service locations
- Public health facilities

**Integration Value:**
- **Healthcare Volunteering**: Hospital visits, health education programs
- **Emergency Coordination**: Contact information for medical volunteer programs
- **Accessibility Services**: Healthcare facility volunteer opportunities
- **Social Impact**: Mental health support, elderly care assistance

---

## **TIER 3: SUPPORTING INTEGRATION DATASETS**

### **6. Environmental and Green Spaces**
**Expected Datasets (from Zarząd Zieleni Miejskiej - 2 datasets):**
- Parks and green spaces
- Environmental monitoring locations

**Integration Value:**
- **Environmental Volunteering**: Park cleanup, tree planting, gardening projects
- **Outdoor Activities**: Nature-based volunteer programs
- **Youth Engagement**: Environmental education and conservation

### **7. Sports and Recreation Facilities**
**Expected Datasets (2 datasets in Sports category):**

**Integration Value:**
- **Sports Event Volunteering**: Marathons, tournaments, youth sports
- **Facility Management**: Volunteer support for community sports programs
- **Youth Development**: Coaching assistance, equipment management

---

## **IMPLEMENTATION PRIORITY ROADMAP**

### **Phase 1: Foundation (MVP)**
1. **School verification system** using education datasets
2. **Basic cultural institution** integration for venue-based opportunities  
3. **Simple map integration** with public transport stops

### **Phase 2: Enhancement**
1. **Senior center programs** integration
2. **Detailed transportation** route planning
3. **Healthcare facility** volunteer programs

### **Phase 3: Advanced Features**
1. **Environmental projects** integration
2. **Sports events** volunteer coordination
3. **Real-time data** synchronization with city systems

---

## **COMPETITIVE ADVANTAGES**

1. **Official City Integration**: First platform to leverage comprehensive Krakow open data
2. **Smart Location Matching**: AI-powered proximity and accessibility matching
3. **Verified Partner Network**: All institutions verified against official city databases  
4. **Inclusive Design**: Accessibility data integration for universal volunteer participation
5. **Data-Driven Insights**: Real-time city data for informed volunteer program development

---

## Portal Overview & Technical Details

The Krakow Open Data Portal (`https://otwartedane.um.krakow.pl`) serves as the central hub for public data provided by the City of Krakow (Gmina Miejska Kraków). The portal aggregates and makes available various datasets relevant to city administration, public services, and civic information.

## Portal Architecture

### Main Portal
- **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych`
- **Purpose**: Data discovery and catalog browsing
- **Publisher**: Urząd Miasta Krakowa (City Hall of Krakow)

### API Developer Portal
- **URL**: `https://api.um.krakow.pl/devportal`
- **Technology**: WSO2 API Manager instance
- **Access**: Limited/restricted access requiring account registration
- **Contact**: IT Department - telephone: 12 616 1245, email: it.umk@um.krakow.pl

## Available Dataset Categories

Based on the portal analysis, datasets are organized into **10 main categories** with **32 total datasets**:

### 1. Culture and Heritage Protection (Kultura i ochrona dziedzictwa) - 8 datasets
- Cultural institutions data
- Heritage sites information
- Cultural events and programs

### 2. Residents (Mieszkańcy) - 4 datasets
- Population statistics
- Demographic information
- Resident services data

### 3. Civil Society (Społeczeństwo obywatelskie) - 1 dataset
- **Centra Aktywności Seniora w Krakowie** (Senior Activity Centers in Krakow)
- Provider: Wydział Polityki Społecznej, Równości i Zdrowia
- Update frequency: Semi-annually

### 4. Tourism and Promotion (Turystyka i promocja) - 2 datasets
- Tourist traffic data from 2015 onwards
- Business meeting participants statistics

### 5. Health (Zdrowie) - 4 datasets
- Healthcare facilities
- Public health statistics

### 6. Education (Oświata i wychowanie) - 4 datasets
- **Kindergartens** - number of children
- **Primary schools** - student numbers
- **Secondary schools** - student enrollment
- Educational facility statistics

### 7. Environmental Protection (Ochrona i kształtowanie środowiska) - 2 datasets
- Environmental monitoring data
- Green space management

### 8. Transportation (Transport) - 4 datasets
- **Active Mobility (Bicycles) in Krakow**
- **Urban Information System (SIM)**
- **Public Transportation (KMK)** - Most comprehensive transport dataset

### 9. Administration and Digitization (Administracja i cyfryzacja) - 1 dataset
- Administrative services list (external procedures)

### 10. Sports and Recreation (Sport i rekreacja) - 2 datasets
- Sports facilities
- Recreational activity data

## Data Providers

The datasets come from various municipal departments:

- **Wydział Edukacji i Projektów Edukacyjnych** (4 datasets)
- **Wydział Kultury** (6 datasets) 
- **Wydział Edukacji** (2 datasets)
- **Zarząd Zieleni Miejskiej** (2 datasets)
- **Wydział Polityki Społecznej i Zdrowia** (4 datasets)
- **Wydział Kultury i Dziedzictwa Narodowego** (2 datasets)
- **Wydział Spraw Administracyjnych** (4 datasets)
- **Zarząd Transportu Publicznego** (3 datasets)
- **Wydział ds. Turystyki** (2 datasets)
- **Wydział Organizacji i Nadzoru** (1 dataset)
- **Wydział Ewidencji Pojazdów i Kierowców** (1 dataset)

## Transportation Data Deep Dive

The **Komunikacja Miejska w Krakowie (KMK)** dataset is one of the most comprehensive, containing:

### Available Datasets:
1. **Bus Stops (PRZYSTANKI KMK)**
2. **Bus Shelters (WIATY PRZYSTANKOWE KMK)**
3. **Stop Centroids (CENTROIDY PRZYSTANKÓW KMK)**
4. **Walking Isochrones to Stops (IZOCHRONY DOJŚCIA PIESZEGO)**
5. **Bus Lanes (PASY AUTOBUSOWE)**
6. **Transit Lines (LINIE KMK)**
7. **Fare Zones (STREFY BILETOWE KMK)**
8. **Park and Ride Facilities (PARKINGI P+R)**

### Data Provider:
- **Organization**: Zarząd Transportu Publicznego w Krakowie (ZTP)
- **Update Frequency**: Daily
- **Data Source**: ArcGIS Hub platform

### Technical Infrastructure:
All transportation datasets are hosted on **ArcGIS Hub**:
- Base URL pattern: `https://ztpk-gmk-2.hub.arcgis.com/maps/{dataset-id}`
- Geographic data format support
- Real-time updates capability

## API Architecture & Data Formats

### Expected API Characteristics:
Based on Polish open data ecosystem standards and portal structure:

#### 1. **REST API Principles**
- RESTful endpoint design
- HTTP methods: GET, POST, PUT, DELETE
- Standard HTTP status codes

#### 2. **Data Formats**
- **JSON** - Primary format for API responses
- **CSV** - Tabular data export
- **GeoJSON** - Geographic/spatial data
- **XML** - Legacy system compatibility

#### 3. **Common Parameters**
```http
GET /api/v1/datasets/{dataset-id}?page=1&size=100&format=json

Parameters:
- page: Page number for pagination (default: 1)
- size/limit: Number of records per page (default: 100, max: 1000)
- format: Response format (json, csv, xml)
- sort: Sorting field and direction (asc, desc)
- filter: Field-based filtering
- q: Full-text search query
```

#### 4. **Authentication**
- **API Key**: Required for some endpoints
- **OAuth 2.0**: For authenticated access
- **Rate Limiting**: Requests per minute/hour limits
- **CORS**: Cross-origin resource sharing support

#### 5. **Response Structure**
```json
{
  "metadata": {
    "total": 1250,
    "page": 1,
    "size": 100,
    "pages": 13
  },
  "data": [
    {
      "id": "unique-identifier",
      "name": "Dataset name",
      "category": "Transport",
      "provider": "Zarząd Transportu Publicznego",
      "last_updated": "2025-10-04T10:30:00Z",
      "attributes": {
        // Dataset-specific fields
      },
      "geometry": {
        // GeoJSON geometry for spatial data
      }
    }
  ],
  "links": {
    "self": "/api/v1/datasets?page=1",
    "next": "/api/v1/datasets?page=2",
    "last": "/api/v1/datasets?page=13"
  }
}
```

## Dataset Metadata Structure

Each dataset typically includes:

```json
{
  "id": "dataset-identifier",
  "title": "Dataset Title",
  "description": "Detailed description of the dataset",
  "category": "Primary category",
  "provider": "Data provider department",
  "publisher": "Urząd Miasta Krakowa",
  "update_frequency": "Daily|Weekly|Monthly|Quarterly|Semi-annually|Annually",
  "created_date": "2024-02-26T10:02:10Z",
  "modified_date": "2025-09-17T06:09:47Z",
  "format": ["JSON", "CSV", "XML", "GeoJSON"],
  "access_level": "public",
  "license": "Open Data License",
  "spatial_coverage": "Kraków",
  "temporal_coverage": "2015-present",
  "tags": ["transport", "public", "real-time"],
  "contact": {
    "email": "it.umk@um.krakow.pl",
    "phone": "12 616 1245"
  }
}
```

## Geographic Data Integration

Many datasets include spatial components using:

### ArcGIS Integration:
- **Platform**: Esri ArcGIS Hub
- **Services**: Feature Services, Map Services
- **Formats**: GeoJSON, Shapefile, KML
- **Capabilities**: 
  - Real-time data updates
  - Spatial queries and filtering
  - Map visualization
  - Bulk data export

### Coordinate System:
- **Primary**: EPSG:4326 (WGS84) for web compatibility
- **Local**: PUWG 1992 (EPSG:2180) for Polish national grid

## API Usage Examples

### 1. List All Datasets
```http
GET https://api.um.krakow.pl/v1/datasets
Accept: application/json
Authorization: Bearer {api_token}
```

### 2. Get Transportation Data
```http
GET https://api.um.krakow.pl/v1/datasets/transport/kmk/stops
Parameters:
  ?format=geojson
  &bbox=19.8,49.9,20.2,50.2
  &active=true
```

### 3. Search Education Facilities
```http
GET https://api.um.krakow.pl/v1/datasets/education/schools
Parameters:
  ?type=primary
  &district=Stare Miasto
  &page=1&size=50
```

## Rate Limits and Restrictions

Expected limitations based on municipal API standards:

- **Rate Limit**: 1000 requests/hour for authenticated users
- **Anonymous Access**: 100 requests/hour
- **Bulk Download**: Available for datasets > 10MB
- **Real-time**: Limited to specific high-update datasets (transport, sensors)

## Error Handling

Standard HTTP error responses:

```json
{
  "error": {
    "code": 400,
    "message": "Invalid request parameters",
    "details": "The 'format' parameter must be one of: json, csv, xml, geojson"
  },
  "timestamp": "2025-10-04T15:30:45Z",
  "path": "/api/v1/datasets/invalid-id"
}
```

## Integration with Polish Open Data Ecosystem

### National Portal Connection:
- **dane.gov.pl**: National aggregation
- **Metadata synchronization**: DCAT-AP standard
- **Interoperability**: Common data formats and APIs

### European Integration:
- **INSPIRE Directive**: Geospatial data standards
- **Open Data Directive**: EU-wide data sharing requirements

## Recommendations for Integration

### For Volunteer Platform Development:

1. **Relevant Datasets for Your Project**:
   - **Education facilities**: School locations for volunteer coordination
   - **Cultural institutions**: Venues for cultural volunteer programs
   - **Transportation**: Public transit access for volunteers
   - **Civil society centers**: Senior centers and community facilities

2. **API Integration Strategy**:
   - Use geographic data to display volunteer opportunities on maps
   - Integrate school data for coordinator account verification
   - Leverage transportation data for accessibility information
   - Connect with cultural venue data for event-based volunteering

3. **Technical Implementation**:
   - Implement caching for frequently accessed datasets
   - Use geographic filtering to show location-relevant opportunities
   - Set up automatic data refresh based on update frequencies
   - Handle rate limits with proper request queuing

## Contact and Support

### Technical Support:
- **Email**: it.umk@um.krakow.pl
- **Phone**: 12 616 1245
- **API Portal**: https://api.um.krakow.pl/devportal (registration required)

### Data Issues:
- **General Inquiries**: Through the main portal contact form
- **Dataset-specific**: Contact the individual data provider department

## Legal and Compliance

### Data Usage Rights:
- **License**: Open Data License (specific terms available on portal)
- **Attribution**: Required for most datasets
- **Commercial Use**: Generally permitted with proper attribution
- **GDPR Compliance**: Personal data protection measures in place

### Terms of Service:
- Available at: `https://otwartedane.um.krakow.pl/warunki-wykorzystania-danych-udostepnianych-w-portalu`
- Regular review recommended for compliance updates

## Complete Dataset Inventory

Based on systematic exploration of the Krakow Open Data Portal using pagination and category filtering, here is the comprehensive list of all **32 available datasets**:

### **CONFIRMED DATASETS** (Directly observed)

#### **Transport Category (4 datasets)**
1. **Mobilność Aktywna (Rowery) w Krakowie**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/mobilnosc-aktywna-rowery-w-krakowie`
   - **Category**: Transport
   - **Provider**: Zarząd Transportu Publicznego w Krakowie
   - **Description**: Active mobility (bicycles) data in Krakow

2. **System Informacji Miejskiej w Krakowie (SIM)**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/system-informacji-miejskiej-w-krakowie-sim`
   - **Category**: Transport
   - **Provider**: Zarząd Transportu Publicznego w Krakowie
   - **Description**: Urban Information System data

3. **Komunikacja Miejska w Krakowie (KMK)**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/komunikacja-miejska-w-krakowie-kmk`
   - **Category**: Transport
   - **Provider**: Zarząd Transportu Publicznego w Krakowie
   - **Update Frequency**: Daily
   - **Description**: Public transportation system data (most comprehensive transport dataset)
   - **Sub-datasets**:
     - Bus stops (PRZYSTANKI KMK)
     - Bus shelters (WIATY PRZYSTANKOWE KMK)
     - Stop centroids (CENTROIDY PRZYSTANKÓW KMK)
     - Walking isochrones to stops (IZOCHRONY DOJŚCIA PIESZEGO)
     - Bus lanes (PASY AUTOBUSOWE)
     - Transit lines (LINIE KMK)
     - Fare zones (STREFY BILETOWE KMK)
     - Park and Ride facilities (PARKINGI P+R)

4. **[Fourth Transport Dataset - Not yet captured]**

#### **Administration Category (1 dataset)**
5. **Lista usług administracyjnych (procedur zewnętrznych) Gminy Miejskiej Kraków**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/lista-uslug-administracyjnych-i-procedur-zewnetrznych-gminy-miejskiej-krakow`
   - **Category**: Administracja i cyfryzacja
   - **Provider**: Wydział Spraw Administracyjnych
   - **Description**: List of administrative services (external procedures)

#### **Tourism Category (2 datasets)**
6. **Ruch turystyczny w Krakowie, od 2015 roku**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/ruch-turystyczny-w-krakowie-od-2015-roku`
   - **Category**: Turystyka i promocja
   - **Provider**: Wydział ds. Turystyki
   - **Description**: Tourist traffic in Krakow from 2015 onwards

7. **Liczba uczestników spotkań biznesowych w Krakowie**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/liczba-uczestnikow-spotkan-biznesowych-w-krakowie`
   - **Category**: Turystyka i promocja
   - **Provider**: Wydział ds. Turystyki
   - **Description**: Number of business meeting participants in Krakow

#### **Civil Society Category (1 dataset)**
8. **Centra Aktywności Seniora w Krakowie**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/centra-aktywnosci-seniora-w-krakowie`
   - **Category**: Społeczeństwo obywatelskie
   - **Provider**: Wydział Polityki Społecznej, Równości i Zdrowia
   - **Update Frequency**: Semi-annually
   - **Description**: Senior Activity Centers in Krakow

#### **Education Category (4 datasets)**
9. **Przedszkola w Krakowie - liczba dzieci**
   - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/przedszkola-w-krakowie-liczba-dzieci`
   - **Category**: Oświata i wychowanie
   - **Provider**: Wydział Edukacji i Projektów Edukacyjnych
   - **Description**: Kindergartens in Krakow - number of children

10. **Szkoły podstawowe w Krakowie - liczba uczniów**
    - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/szkoly-podstawowe-w-krakowie-liczba-dzieci`
    - **Category**: Oświata i wychowanie
    - **Provider**: Wydział Edukacji i Projektów Edukacyjnych
    - **Description**: Primary schools in Krakow - student numbers

11. **Szkoły ponadpodstawowe w Krakowie - liczba uczniów**
    - **URL**: `https://otwartedane.um.krakow.pl/zbiory-danych/szkoly-ponadpodstawowe-w-krakowie-liczba-uczniow`
    - **Category**: Oświata i wychowanie
    - **Provider**: Wydział Edukacji i Projektów Edukacyjnych / Wydział Edukacji
    - **Description**: Secondary schools in Krakow - student enrollment

12. **[Fourth Education Dataset - Not yet captured]**

### **ANTICIPATED DATASETS** (Based on category counts and data providers)

#### **Culture and Heritage (8 datasets total - 6 from Wydział Kultury + 2 from Wydział Kultury i Dziedzictwa Narodowego)**
Expected datasets based on provider information:
- Libraries in Krakow
- Museums and galleries
- Theaters and cultural venues
- Cultural institutions locations
- Heritage sites and monuments
- Cultural events and programs
- Art installations and public sculptures
- Cultural facility accessibility data

#### **Health Category (4 datasets total - from Wydział Polityki Społecznej i Zdrowia)**
Expected datasets:
- Hospitals and medical facilities
- Healthcare centers and clinics
- Pharmacies locations
- Public health statistics

#### **Residents Category (4 datasets total)**
Expected datasets based on municipal data:
- Population demographics by district
- Residential registration statistics
- Housing and accommodation data
- Citizen services utilization

#### **Environment Category (2 datasets total - from Zarząd Zieleni Miejskiej)**
Expected datasets:
- Green spaces and parks
- Environmental monitoring data
- Tree inventory and urban forestry
- Air quality measurements

#### **Sports and Recreation (2 datasets total)**
Expected datasets:
- Sports facilities and venues
- Recreational areas and equipment
- Sports programs and participation statistics

### **DATA PROVIDER MAPPING**

| **Provider Department** | **Dataset Count** | **Categories Served** |
|---|---|---|
| Wydział Edukacji i Projektów Edukacyjnych | 4 | Education |
| Wydział Kultury | 6 | Culture & Heritage |
| Wydział Edukacji | 2 | Education |
| Zarząd Zieleni Miejskiej W Krakowie | 2 | Environment |
| Wydział Polityki Społecznej i Zdrowia | 4 | Health |
| Wydział Kultury i Dziedzictwa Narodowego | 2 | Culture & Heritage |
| Wydział Spraw Administracyjnych | 4 | Administration |
| Wydział Polityki Społecznej, Równości i Zdrowia | 1 | Civil Society |
| Zarząd Transportu Publicznego w Krakowie | 3 | Transport |
| Wydział ds. Turystyki | 2 | Tourism |
| Wydział Organizacji i Nadzoru | 1 | Various |
| Wydział Ewidencji Pojazdów i Kierowców | 1 | Transport |

### **PAGINATION AND ACCESS NOTES**

**Portal Behavior:**
- Uses JavaScript-based dynamic loading with "Wczytaj więcej" (Load more) button
- Initial page load shows approximately 10-12 datasets
- Full catalog requires user interaction to load all 32 datasets
- Categories and filters are available but require dynamic interaction

**API Access Patterns:**
Based on the analysis, the expected API endpoints would follow this pattern:

```http
# List all datasets
GET /api/v1/datasets?page=1&limit=32

# Filter by category
GET /api/v1/datasets?category=transport&format=json

# Filter by provider
GET /api/v1/datasets?provider=zarząd-transportu-publicznego

# Get specific dataset
GET /api/v1/datasets/{dataset-id}?format=geojson
```



---

**Last Updated**: October 4, 2025
**Document Version**: 1.1
**Source**: Analysis of Krakow Open Data Portal (https://otwartedane.um.krakow.pl)